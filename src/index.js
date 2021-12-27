document.addEventListener(`DOMContentLoaded`, () => {


    function makeEverything(object) {
        let meal = object.recipe
        let img = meal.image
        let name = meal.label
        let servings = meal.yield
        let calories = meal.calories / servings
        let nutrients = meal.totalNutrients
        let carbAmt = nutrients.CHOCDF.quantity / servings
        let proteinAmt = nutrients.PROCNT.quantity / servings
        let fatAmt = nutrients.FAT.quantity / servings



    }

    document.getElementById(`form`).addEventListener(`submit`, e => {
        e.preventDefault()
        let calories = e.target.querySelector(`#calories`).value
        let carbs = e.target.querySelector(`#carbs`).value
        let protein = e.target.querySelector(`#protein`).value
        let fats = e.target.querySelector(`#fats`).value
        let query = e.target.querySelector(`#query`).value

        let [minCalorie, maxCalorie] = [parseInt(calories) - 10, parseInt(calories)]
        let [minCarbs, maxCarbs] = [parseInt(carbs) - 10, parseInt(carbs)]
        let [minProtein, maxProtein] = [parseInt(protein) - 10, parseInt(protein)]
        let [minFats, maxFats] = [parseInt(fats) - 10, parseInt(fats)]

        if (calories === '') {
            calorieParam = ''
        } else {
            if (minCalorie <= 0) {
                maxCalorie = 20
            } 
            calorieParam = `&calories=${minCalorie}-${maxCalorie}`
        }
        //------------------------------------------
        if (carbs === '') {
            carbParam = ''
        } else {
            if (minCarbs <= 0) {
                maxCarbs = 20
            } 
            carbParam = `&nutrients%5BCHOCDF%5D=${minCarbs}-${maxCarbs}`
        }
        //------------------------------------------
        if (protein === '') {
            proteinParam = ''
        } else {
            if (minProtein <= 0) {
                maxProtein = 20
            } 
            proteinParam = `&nutrients%5BPROCNT%5D=${minProtein}-${maxProtein}`
        }
        //------------------------------------------
        if (fats === '') {
            fatsParam = ''
        } else {
            if (minFats <= 0) {
                maxFats = 20
            }
            fatsParam = `&FAT=${minFats}-${maxFats}`
        }
    
      fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a017b689&app_key=98d82684e40a38e25c3eb55de4abcd75${calorieParam}${carbParam}${proteinParam}${fatsParam}`)
      .then(resp => {
        console.log(resp)
        return resp.json()
    })
      .then(data => {
          data.hits.forEach(makeEverything)
        })





    })
})

//-----------------------------------------------------------


    //     fetch(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=4c88f9565fdd4fd2af803d0b2bbe0d96${minCalorie}${maxCalorie}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFats}${maxFats}&number=10`)
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error))

    