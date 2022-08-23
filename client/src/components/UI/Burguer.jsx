function Burguer({light}) {
    
    return (
        <svg width="40px" height="40px" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" color={`${light?"#76FDDD":"#78D8F0"}`}><path d="M0 0h24v24H0z" fill="none"></path><path d="M3 18h18v-2H3v2zm0-5h18v-2H3v2zm0-7v2h18V6H3z"></path></svg>
    )
}

export default Burguer