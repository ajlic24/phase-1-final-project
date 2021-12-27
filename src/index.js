document.addEventListener(`DOMContentLoaded`, () => {
//   fetch(`https://api.edamam.com/api/recipes/v2?type=public&q=${query}&app_id=a017b689&app_key=98d82684e40a38e25c3eb55de4abcd75${calorieParam}${carbParam}${proteinParam}${fatsParam}`)
//   .then(resp => resp.json())
//   .then(data => console.log(data.hits))

  document.getElementById(`form`).addEventListener(`submit`, e => {
        e.preventDefault()
        let calories = parseInt(e.target.querySelector(`#calories`).value)
        let carbs = parseInt(e.target.querySelector(`#carbs`).value)
        let protein = parseInt(e.target.querySelector(`#protein`).value)
        let fats = parseInt(e.target.querySelector(`#fats`).value)
        let query = e.target.querySelector(`#query`).value

        let [minCalorie, maxCalorie] = [calories - 10, calories]
        let [minCarbs, maxCarbs] = [carbs - 10, carbs]
        let [minProtein, maxProtein] = [protein - 10, protein]
        let [minFats, maxFats] = [fats - 10, fats]

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
            carbParam = `&nutrients[CHOCDF.net]=${minCarbs}-${maxCarbs}`
        }
        //------------------------------------------
        if (protein === '') {
            proteinParam = ''
        } else {
            proteinParam = `&nutrients[PROCNT]=${minProtein}-${maxProtein}`
        }
        //------------------------------------------
        if (fats === '') {
            fatsParam = ''
        } else {
            if (minFats <= 0) {
                minFats = 20
            }
            fatsParam = `&FAT=${minFats}-${maxFats}`
        }







    })
})

//-----------------------------------------------------------


    //     fetch(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=4c88f9565fdd4fd2af803d0b2bbe0d96${minCalorie}${maxCalorie}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFats}${maxFats}&number=10`)
    //     .then(resp => resp.json())
    //     .then(data => console.log(data))
    //     .catch(error => console.log(error))

    