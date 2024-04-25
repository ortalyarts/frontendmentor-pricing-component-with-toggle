//Populate products from JSON

function listItemsForEach(data, time) {
    data.forEach((item, index) => {
            
        //Home-page content
        el = document.createElement('li');
        el.classList.add('price-option');
        el.classList.add('bodyM');
        el.setAttribute("id", `price-option-${index}`);

        const features = [];
        item.features.forEach((listItem) => {
            let feature = `<li>${listItem}</li>`
            features.push(feature);
        }); 
       
        el.innerHTML = 
        `
         <div class="price-option-desc">            
            <h2 class="headingM">
            ${item.title}
            <span class="price">
                <span class="dollar">&dollar;</span>
                <span class="headingXL">${item[time]}</span>
            </span>
            </h2>
        </div>
        <ul class="features">
            ${features.join("")}
        </ul>
        <button class="btn btn-light" aria-label="Learn more about ${item.title} pack">Learn more</button>
        `;

        document.querySelector('#price-options-holder').appendChild(el)
    
      });
}
let storeData;
async function fetchData(){
    try{
        const response = await fetch(`/data.json`)

        if(!response.ok){
            throw new Error("Could not fetch resource")
        }

        const data = await response.json();
        storeData = data; 
        // ==== if json data ok:
        listItemsForEach(data, "priseMonthly");
        // ======

    }
    catch(error){
        console.log(error);
    }
}

fetchData();

const checkboxToggle = document.querySelector('#price-toggle-button'); 

checkboxToggle.addEventListener('change', ()=>{
    const toggleAnnounceLabel = document.querySelector('#toggle-announce');
    if (this.checked) {
        // change to monthly
        this.checked = false;
        toggleAnnounceLabel.innerText = "Prices for monthly payment method"
        const allPrices = Array.from(document.querySelectorAll('.price-option'));
        allPrices.forEach((item, index)=>{
            document.querySelector(`#price-option-${index} .price .headingXL`).innerText = storeData[index].priseMonthly;
        })
      } else {
        // change to yearly
        this.checked = true;
        toggleAnnounceLabel.innerText = "Prices for yearly payment method"
        const allPrices = Array.from(document.querySelectorAll('.price-option'));
        allPrices.forEach((item, index)=>{
            document.querySelector(`#price-option-${index} .price .headingXL`).innerText = storeData[index].priseYearly;
        })
      }
})
