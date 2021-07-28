// const formEl = document.getElementById('form')
// const rateEl = document.getElementById('rate')


// formEl.addEventListener('submit', async e => {
//     e.preventDefault()
//     const num = +e.target.num.value
//     const [savedNums, savedNumsError] = await addNum(num)
//     if (!savedNumsError) {
//         console.log(`Success! Updated nums array is ${savedNums}`);
//     } else{
//         console.warn(`Num is not saved! Error is ${savedNumsError}`);
//     }
// })
// renderRate(rateEl)

// async function renderRate(rateElem) {
//     const [rate, rateError] = await getUSDRate()
//    if (!rateError) {
//     rateElem.innerHTML = `USD rate is ${rate.sale}`
//    } else{
//     rateElem.innerHTML = `Error request rates from bank!`
//    }
// }

// const obj = {

//     x: 10,
    
//     y: 20
    
//     }
    
//     const prop =
//     Object
    
//     .keys (obj)
    
//     .reverse()
    
//     .join('')
    
//     obj.xy
//     = 30
    
//     obj.yx = 40
    
//     obj.x10y20 = 50
    
//     obj.y20x10 = 60
    
//     const result = obj[prop]
    
//     console.log(result); // ?
const obj = {

    x: 10,
    
    y: 20,
    
    Z: 30
    
    }
    
    // 1
    
    // const result =
    // obj.values()
    
    // 2
    
    const result = Object.values (obj)
    
    // // 3
    
    // const result =
    // Object.values (obj, 'x', 'y', 'z')
    
    // // 4
    
    // const result = obj.values ('x',
    // obj.values ('x', 'y', 'z')
    
    console.log(result); // [10, 20, 30]
     
    
    