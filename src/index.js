document.addEventListener(`DOMContentLoaded`, () => {
    document.getElementById(`form`).addEventListener(`submit`, e => {
        e.preventDefault()
        let calories = parseInt(e.target.querySelector(`#calories`).value)
        let carbs = parseInt(e.target.querySelector(`#carbs`).value)
        let protein = parseInt(e.target.querySelector(`#protein`).value)
        let fats = parseInt(e.target.querySelector(`#fats`).value)

        let minCalorie, maxCalorie;
        let minCarbs, maxCarbs;
        let minProtein, maxProtein;
        let minFats, maxFats;

        if (calories === '') {
            minCalorie = ''
            maxCalorie = ''
        } else {
            minCalorie = `&minCalories=${calories - 10}`
            maxCalorie = `&maxCalories=${calories}`
        }
        //------------------------------------------
        if (carbs === '') {
            minCarbs = ''
            maxCarbs = ''
        } else {
            minCarbs = `&minCarbs=${carbs - 10}`
            maxCarbs = `&maxCarbs=${carbs}`
        }
        //------------------------------------------
        if (protein === '') {
            minProtein = ''
            maxProtein = ''
        } else {
            minProtein = `&minProtein=${protein - 10}`
            maxProtein = `&maxProtein=${protein}`
        }
        //------------------------------------------
        if (fats === '') {
            minFats = ''
            maxFats = ''
        } else {
            minFats = `&minFat=${fats - 10}`
            maxFats = `&maxFat=${fats}`
        }

        fetch(`https://api.spoonacular.com/recipes/findByNutrients?apiKey=4c88f9565fdd4fd2af803d0b2bbe0d96${minCalorie}${maxCalorie}${minCarbs}${maxCarbs}${minProtein}${maxProtein}${minFats}${maxFats}&number=10`)
        .then(resp => resp.json())
        .then(data => console.log(data))
        .catch(error => console.log(error))

    })
})