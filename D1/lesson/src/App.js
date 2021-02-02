import './App.css'
import { connect } from 'react-redux'
import 'bootstrap/dist/css/bootstrap.min.css'
import { Button } from 'react-bootstrap'

// mapStateToProps is a function that returns an object
// this object will contain the redux store properties you want
// your component to receive as props
const mapStateToProps = (state) => ({ count: state.count, mickey: state.mickey })

// mapDispatchToProps is a function that returns an object
// this object will contain the functions that we'll be able
// to dispatch from our component
const mapDispatchToProps = (dispatch) => ({
  increment: () =>
    dispatch({
      type: 'INCREMENT', // this is the action we're dispatching
    }),

  decrement: () => dispatch({ type: 'DECREMENT' }), // this is the action we're dispatching

  changeName: () =>
    dispatch({
      type: 'CHANGE_NAME', // this is the action we're dispatching
      payload: 'Stefano',
    }),
})

function App({ count, increment, decrement, changeName, mickey }) {
  console.log(mickey)
  console.log(changeName)
  return (
    <div className="App">
      <header className="App-header" style={{ fontSize: '5rem' }}>
        <Button variant="info" onClick={increment}>
          +
        </Button>
        {count}
        <Button variant="info" onClick={decrement}>
          -
        </Button>
        <div onClick={changeName}>{mickey}</div>
      </header>
    </div>
  )
}

export default connect(mapStateToProps, mapDispatchToProps)(App)

// connect needs two parameters, which are
// the two functions mapStateToProps and mapDispatchToProps