import React, { Component } from "react";
import Button from "react-bootstrap/Button";
import { connect } from "react-redux";

// redux-thunk is necessary for delaying the dispatch of action,
// or for conditionally dispatch an action
// or for performing async operations before the dispatching

const mapStateToProps = (state) => state;

const mapDispatchToProps = (dispatch) => ({
  addToCart: (id) =>
    // fetch the data
    dispatch(
      {
        type: "ADD_ITEM_TO_CART",
        payload: id,
      }
    ),

  striveSchool: () => dispatch({ type: 'STRIVE_SCHOOL' }),

  addToCartWithThunk: (id) =>
    dispatch(async (dispatch, getState) => {
      // perform fetches, do if/elses, conditionally perform logic
      // ASYNC STUFF!!
      const resp = await fetch('https://jsonplaceholder.typicode.com/todos/1')
      const data = await resp.json()
      console.log(data)
      console.log('current state: ', getState().cart)
      if (resp.ok) {
        dispatch(
          {
            type: "ADD_ITEM_TO_CART",
            payload: id,
          }
        )
      } else {
        dispatch(
          {
            type: "SET_ERROR",
            payload: data,
          }
        )
      }
    })
});

// with redux-thunk we can create action-creators that can not only dispatch ACTIONS,
// but that can also dispatch FUNCTIONS


class BookDetail extends Component {
  constructor(props) {
    super(props);
    this.state = {
      book: null,
    };
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.bookSelected !== this.props.bookSelected) {
      this.setState({
        book: this.props.books.find(
          (book) => book.id === this.props.bookSelected
        ),
      });
    }
  }

  render() {
    return this.state.book ? (
      <div className="col-md-8">
        <div className="row no-gutters mt-2">
          <div className="col-sm-12 px-0">
            <h1>{this.state.book.title}</h1>
          </div>
          <div className="row mt-3">
            <div className="col-sm-5">
              {
                this.props.cart.error && <h1>ERROR</h1>
              }
              <img
                className="book-cover"
                src={this.state.book.imageUrl}
                alt="book selected"
              />
            </div>
            <div className="col-sm-7">
              <p>
                <span className="font-weight-bold">Description: </span>
                {this.state.book.description}
              </p>
              <p>
                <span className="font-weight-bold">Price: </span>
                {this.state.book.price}
              </p>
              {this.props.user.username ? (
                <Button
                  color="primary"
                  onClick={() => this.props.addToCartWithThunk(this.state.book.id)}
                >
                  BUY
                </Button>
              ) : (
                  <p>
                    <u>Users must log in to purchase</u>
                  </p>
                )}
            </div>
          </div>
        </div>
      </div>
    ) : (
        <div className="col-md-8">
          <div className="row no-gutters mt-2">
            <h3> Please select a book! </h3>
          </div>
        </div>
      );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(BookDetail);
