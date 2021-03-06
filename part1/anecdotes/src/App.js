import { useState } from 'react'

const Button = ({onClick, text}) => (
  <button onClick={onClick}>
    {text}
  </button>
)

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.'
  ]
  const voteAnecdote = () => {
    const newVotes = [...votes]
    newVotes[selected] += 1
    setVotes(newVotes)
  }
  const pickAnecdote = () => {
    const anecdotesLength = anecdotes.length
    const random = Math.floor(Math.random() * anecdotesLength)
    setSelected(random)
  }
  const maxAnecdote = () => {
    const maxVote = Math.max(...votes)
    if (maxVote === 0) {
      return 'no votes cast yet'
    }
    const maxIndex = votes.findIndex(e => e === maxVote)
    return anecdotes[maxIndex]
  }
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState(Array(anecdotes.length).fill(0))
  console.log(votes)

  return (
    <div>
      <h1>Anecdote of the day</h1>
      <p>{anecdotes[selected]}</p>
      <p>has {votes[selected]} votes</p>
      <Button onClick={voteAnecdote} text='vote' />
      <Button onClick={pickAnecdote} text='next anecdote' />
      <h1>Anecdote with most votes</h1>
      <p>{maxAnecdote()}</p>
    </div>
  )
}

export default App