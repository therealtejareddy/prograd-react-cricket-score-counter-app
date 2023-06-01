import {useState} from 'react'

function ScoreCounterComponent() {
    const [totalScore, setTotalScore] = useState(0)
    const [wickets, setWickets] = useState(0)
    const [overs, setOvers] = useState(0)
    const [balls, setBalls] = useState(0)
    const [ballHistory, setballHistory] = useState([])
    const MAX_OVERS = 9

    function addScore(score) {
        if(score==="WB"||score==="NB"){
            setTotalScore(prevScore => prevScore+1)
            score==="WB"?updateballHistory("1WB"):updateballHistory("1NB")
        }
        else {
            if(wickets<10 && (overs!=MAX_OVERS || balls!=0)){
            setTotalScore(prevScore => prevScore+score)
            updateballHistory(score)
            updateBalls()

        }
        }
    }
    function updateWickets(){
        if(wickets<10){
            if(overs<MAX_OVERS||balls>0){
                setWickets(prevWicket => prevWicket+1)
                updateballHistory("W")
                updateBalls()
        }
        }
    }

    function updateBalls() {
        setBalls(prevBall => prevBall+1)
        if(balls==5){
            setBalls(0)
            setOvers(prevOver => prevOver+1)
        }
    }

    function updateballHistory(ball) {
        // if(ballHistory.length===15){
        //     let ballArray = ballHistory
        //     setballHistory(prevHist =>{
        //         return [...prevHist.slice(1)]
        //     })
        // }
        setballHistory(prevHist => [...prevHist,ball])
    }

    function gameType(MAX_OVERS){
        if(MAX_OVERS==1){
            return "Super Over"
        }
        if(MAX_OVERS==10){
            return "T10"
        }
        if(MAX_OVERS==20){
            return "T20"
        }if(MAX_OVERS==50){
            return "ODI"
        }if(MAX_OVERS==Infinity){
            return "Test"
        }
        return "Gully"
    }

    function resetMatch() {
        setTotalScore(0)
        setWickets(0)
        setOvers(0)
        setBalls(0)
        setballHistory([])
    }

  return (
    <div>
        <h1 className="-mt-20 mb-20 font-semibold">{gameType(MAX_OVERS)} Game</h1>
        <h2 className="text-7xl font-bold mb-10">Score - {totalScore}/{wickets}</h2>
        <h2 className="text-5xl font-bold mb-5">Overs - {overs}:{balls}</h2>
        <div className="flex gap-2 items-center justify-center m-5">
            {
                ballHistory && ballHistory.slice(-15).map((ball,index) => <span key={index} className={(ball==4 || ball==6)?"bg-yellow-400 px-2 rounded-sm":(ball=="W"?"bg-red-400 px-2 rounded-sm":"bg-blue-400 px-2 rounded-sm")}>{ball}</span>)
            }
        </div>

        {
            (wickets<10 && (overs!=MAX_OVERS || balls!=0)) ?(
                <div>
                    <div className="buttons flex gap-4 items-center justify-center my-6">
                        <button className='bg-blue-900 text-white' onClick={()=>addScore(0)}>0</button>
                        <button onClick={()=>addScore(1)}>1</button>
                        <button onClick={()=>addScore(2)}>2</button>
                        <button onClick={()=>addScore(3)}>3</button>
                        <button className="bg-yellow-400" onClick={()=>addScore(4)}>4</button>
                        <button className="bg-blue-400" onClick={()=>addScore(6)}>6</button>
                    </div>
                    <div className='flex gap-4 items-center justify-center'>
                        <button className='bg-teal-200' onClick={()=>addScore("WB")}>WB</button>
                        <button className='bg-teal-200' onClick={()=>addScore("NB")}>NB</button>
                        <button className='bg-red-500 text-white' onClick={()=>updateWickets()}>wicket</button>

                    </div>
                </div>
            ) : 
            (
                <div>
                    <div>
                        <div className='flex gap-6 items-center justify-center'>
                            <h2 className='font-semibold'>Total Score - {totalScore}</h2>
                            <h2 className='font-semibold'>wickets Down - {wickets}</h2>
                        </div>
                        <div className='flex gap-6 items-center justify-center'>
                            <h2 className='font-semibold'>Dot Balls - {ballHistory.filter(x => x===0).length}</h2>
                            <h2 className='font-semibold'>Boundaries - {ballHistory.filter(x => (x===4) || (x===6)).length}</h2>
                        </div>
                        <div className='flex gap-6 items-center justify-center'>
                            <h2 className='font-semibold'>Wide Balls - {ballHistory.filter(x => x==="1WB").length}</h2>
                            <h2 className='font-semibold'>No Balls - {ballHistory.filter(x => x==="1NB").length}</h2>
                        </div>
                        <h2 className='font-semibold'>Run Rate - {(totalScore/(overs+(balls/6))).toPrecision(3)}</h2>
                    </div>
                </div>
            )
        }
        <button className='bg-red-700 text-white mt-20' onClick={resetMatch}>Reset</button>
    </div>
  )
}

export default ScoreCounterComponent