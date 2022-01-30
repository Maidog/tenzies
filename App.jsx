import React from "react"
import Die from "./Die"
import {nanoid} from "nanoid"
import Confetti from 'react-confetti'

export default function App() {

    const [dice, setDice] = React.useState(allNewDice())
    const [tenzies, setTenzies] = React.useState(false)
    
    
    
    React.useEffect(() => {
        let heldCount = 0
        for(let i = 0; i < dice.length; i++) {
            const die = dice[i]
            if (die.isHeld === true){
                heldCount++
            }
        }
        
        let sameDice = false
        for(let i = 0; i < 9; i++){
            const die = dice[i]
            const nextDie = dice[i+1]
            if (die.value === nextDie.value) {
                sameDice = true}
            else{
                sameDice = false
            }
        }
        
        if(heldCount === 10 && sameDice === true) {
            setTenzies(true) 
            console.log("you won!")
        }
    }, [dice])
/**
 * Challenge: Check the dice array for these winning conditions:
 * 1. All dice are held, and
 * 2. all dice have the same value
 * 
 * If both conditions are true, set `tenzies` to true and log
 * "You won!" to the console
 */

    function generateNewDie() {
        return {
            value: Math.ceil(Math.random() * 6),
            isHeld: false,
            id: nanoid()
        }
    }
    
    function allNewDice() {
        const newDice = []
        for (let i = 0; i < 10; i++) {
            newDice.push(generateNewDie())
        }
        return newDice
    }
    
    
    function rollDice() {
        if(tenzies !== true){
            setDice(oldDice => oldDice.map(die => {
                return die.isHeld ? 
                    die :
                    generateNewDie()
            }))
        }else{
            setTenzies(false)
            setDice(allNewDice)
        }
    }
    
    function holdDice(id) {
        setDice(oldDice => oldDice.map(die => {
            return die.id === id ? { ...die , isHeld: !die.isHeld} : die
        }))
    }
    
    const diceElements = dice.map(die => (
        <Die 
            key={die.id} 
            value={die.value} 
            isHeld={die.isHeld} 
            holdDice={() => holdDice(die.id)}
        />
    ))
    
    return (
        <main>
            {tenzies && <Confetti />}
            <h1 className="title">Tenzies</h1>
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
            <div className="dice-container">
                {diceElements}
            </div>
            <button className="roll-dice" onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
        </main>
    )
}