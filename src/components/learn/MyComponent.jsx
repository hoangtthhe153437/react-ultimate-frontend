
import './style.css';

const MyComponent = () => {
    // const hoidanit = "eric 1"; //string
    // const hoidanit = 25; //number
    // const hoidanit = true; //boolean
    // const hoidanit = undefined; //undefined
    // const hoidanit = null;
    const hoidanit = [1, 2, 3];
    // const hoidanit = {
    //     name: "eric",
    //     age: 25,
    // }
    return (
        <>
            <div className="">{JSON.stringify(hoidanit)} & hoi dan IT</div>
            <div>{console.log("Eric")}</div>
            <div className="child" style={{ borderRadius: "10px" }} >child</div>
        </>
    );
}

export default MyComponent;
