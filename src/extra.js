export const User = (props) => {
    return (
         <div>
            {props.isGasPlanet ? <h1>{props.name}</h1> : null}
        </div>
    );
}
