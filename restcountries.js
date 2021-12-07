document.querySelector("form").addEventListener("submit", (event) => {
    event.preventDefault();
  
    const region = document.querySelector("[name=region]").value;
  
    const regionDisplay = `
          <div class="text-center fs-1">Countries of ${region}</div>
    `;
    document.querySelector(".js-region").innerHTML = regionDisplay;
  
    fetch(`https://restcountries.com/v3.1/region/${region}`)
      .then((result) => result.json())
      .then((data) => {
        const countryList = data;
  
        const markup = countryList.map
          (
            (country) => `
            <div class="
              card 
              d-flex 
              flex-column 
              justify-content-between
              m-1 
              shadow 
              p-3 mb-5 
              bg-body 
              rounded  
              country-card">
              
                <img src="${Object.values(country.flags)[0]}"
                 class="card-img-top border" alt="Flag of ${country.name.common}">
              
                <table class="table table-success table-striped">
                    <tr>
                      <th scope="row">Name:</th> 
                      <td>${country.name.common}</td>
                    </tr>
                    <tr>
                    <th scope="row">Capital:</th>
                      <td>${(country.capital).join(", ")}</td>
                    </tr>
                    <tr>
                    <th scope="row">Region:</th>
                      <td>${country.region}</td>
                    </tr>
                    <tr>
                    <th scope="row" >Languages:</th>
                    <td>
                     ${Object.values(country.languages).join(", ")} 
                    </td>  
                    </tr> 
                    <tr>
                    <th scope="row">Currencies:</th>
                      <td>
                      ${Object.values(Object.keys(country.currencies)).join(", ")}
                      </td>
                    </tr>
                </table>
              </div>
            `
          )
          .join("");
        document.querySelector(".js-countrys").innerHTML = markup;
      })
      .catch((error) => {
        console.log("Error:", error);
      });
  });
  