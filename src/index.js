document.addEventListener(`DOMContentLoaded`, () => {

    const card = document.getElementById('put-here')
    
    function create(ele) {
        return document.createElement(ele)
    }

    function makeEverything(object) {
        let meal = object.recipe
        let img = meal.image
        let name = meal.label
        let servings = meal.yield
        let calories = parseInt(meal.calories / servings)
        let nutrients = meal.totalNutrients
        let carbAmt = parseInt(nutrients.CHOCDF.quantity / servings)
        let proteinAmt = parseInt(nutrients.PROCNT.quantity / servings)
        let fatAmt = parseInt(nutrients.FAT.quantity / servings)

        let [col, equal, image, cardBody, cardTitle, cardText, span] = [create('div'), create('div'), create('img'), create('div'), create('h5'), create('p'), create('span')]

        col.className = 'col'
        equal.className = 'card h-100'
        image.className = 'card-img-top'
        cardBody.className = 'card-body'
        cardTitle.className = 'card-title'
        cardText.className = 'card-text'
        image.src = img
        cardTitle.textContent = name
        cardText.textContent = `Calories: ${calories} grams\nCarbs: ${carbAmt} grams\nProtein: ${proteinAmt} grams\nFats: ${fatAmt} grams`

        cardBody.append(cardTitle, cardText)
        equal.append(image, cardBody)
        col.appendChild(equal)
        card.appendChild(col)


    }

    document.getElementById(`form`).addEventListener(`submit`, e => {
        e.preventDefault()
        card.replaceChildren()

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


    