document.addEventListener(`DOMContentLoaded`, () => {

    let [form, card, planCard, search, meal, searchPage, resultPage, planPage, info] = [get(`form`), get('put-here'), get(`plan-card`), get(`search-link`), get(`meal-link`), get(`searchPage`), get(`resultsPage`), get(`planPage`), get(`info-box`)]
    //----------------------Functions---------------------------//
    function get(ele) {
        return document.getElementById(ele)
    }

    function create(ele) {
        return document.createElement(ele)
    }

    function addMeal({ name, image, source, nutrients, id }) {

        let [col, equal, imgEle, cardBody, cardTitle, cardText, remove, a] = [create('div'), create('div'), create('img'), create('div'), create('h5'), create('p'), create('button'), create('a')]

        remove.className = 'btn-close'
        col.className = 'col'
        equal.className = 'card h-100'
        imgEle.className = 'card-img-top'
        cardBody.className = 'card-body'
        cardTitle.className = 'card-title'
        cardText.className = 'card-text'
        imgEle.src = image
        a.href = source
        a.target = '_blank'
        cardTitle.textContent = name
        cardText.textContent = `Calories: ${nutrients.calories} | Carbs: ${nutrients.carbs} grams | Protein: ${nutrients.protein} grams | Fats: ${nutrients.fat} grams`


        remove.addEventListener(`click`, () => {
            fetch(`http://localhost:3000/plan/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                }
            })
                .then(resp => resp.json())
                .then(planCard.removeChild(col))
        })

        equal.style = 'background-color: #f8f9fa;'
        a.appendChild(cardTitle)
        cardBody.append(a, cardText)
        equal.append(remove, imgEle, cardBody)
        col.appendChild(equal)
        planCard.appendChild(col)
    }

    function makeEverything(object) {
        let meal = object.recipe
        let img = meal.image
        let name = meal.label
        let servings = meal.yield
        let url = meal.shareAs
        let calories = parseInt(meal.calories / servings)
        let nutrients = meal.totalNutrients
        let carbAmt = parseInt(nutrients.CHOCDF.quantity / servings)
        let proteinAmt = parseInt(nutrients.PROCNT.quantity / servings)
        let fatAmt = parseInt(nutrients.FAT.quantity / servings)

        let [col, equal, image, cardBody, cardTitle, cardText, addBtn, a] = [create('div'), create('div'), create('img'), create('div'), create('h5'), create('p'), create('button'), create('a')]

        col.className = 'col'
        equal.className = 'card h-100'
        image.className = 'card-img-top'
        cardBody.className = 'card-body'
        cardTitle.className = 'card-title'
        cardText.className = 'card-text'
        addBtn.className = 'btn btn-success'
        a.href = url
        a.target = '_blank'
        image.src = img
        addBtn.textContent = 'Add'
        cardTitle.textContent = name
        cardText.textContent = `Calories: ${calories} | Carbs: ${carbAmt} grams | Protein: ${proteinAmt} grams | Fats: ${fatAmt} grams`

        addBtn.addEventListener(`click`, () => {
            fetch(`http://localhost:3000/plan`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    name: name,
                    image: img,
                    source: url,
                    nutrients: {
                        calories: calories,
                        carbs: carbAmt,
                        protein: proteinAmt,
                        fat: fatAmt
                    }
                })
            })
                .then(resp => resp.json())
                .then(() => {
                    addBtn.className = 'btn btn-danger'
                    addBtn.textContent = 'Added'
                    addBtn.disabled = true
                })
                .catch(error => alert(error))
        })

        a.appendChild(cardTitle)
        cardBody.append(a, cardText, addBtn)
        equal.append(image, cardBody)
        col.appendChild(equal)
        card.appendChild(col)
    }
    //----------------------Events----------------------------//
    form.addEventListener(`submit`, e => {
        e.preventDefault()
        card.replaceChildren()
        info.className = 'container d-none'

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
            .then(resp => resp.json())
            .then(data => data.hits.forEach(makeEverything))
        form.reset()

    })

    search.addEventListener(`click`, (e) => {
        searchPage.className = 'container'
        resultPage.className = 'container'
        info.className = 'container'
        planPage.className = 'container d-none'
        
    })

    meal.addEventListener(`click`, (e) => {
        planCard.replaceChildren()
        searchPage.className = 'container d-none'
        resultPage.className = 'container d-none'
        info.className = 'container d-none'
        planPage.className = 'container'


        fetch(`http://localhost:3000/plan`)
            .then(resp => resp.json())
            .then(data => data.forEach(addMeal))
    })
})


