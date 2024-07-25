let countries=document.getElementById('search-country');
let cities=document.getElementById('search-city');



document.getElementById('form').addEventListener('submit',function(event){
    event.preventDefault();

    let inform={
        country:countries.value,
        city:cities.value
    }
    getsearch(inform.country,inform.city);
    cleardata();
});

async function getsearch(country,city){

    try{
        let response=await fetch(`https://api.aladhan.com/v1/timingsByCity?city=${city}&country=${country}&method=8`);
        let result= await response.json();
        display(result.data.timings)

    }
    catch(error){
        console.error('error fetch',error);
    }
}

function display(time){
    let cartona=`
                <div class="col-12 col-lg-2  order-5 order-lg-0">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">العشاء</h2>
                            <p class="p-5">${converttime(time.Isha)}</p>
                        </div>
                </div>
                <div class="col-12 col-lg-2  order-4 order-lg-1">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">المغرب</h2>
                            <p class="p-5">${converttime(time.Maghrib)}</p>
                        </div>
                </div>
                <div class="col-12 col-lg-2  order-3 order-lg-2">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">العصر</h2>
                            <p class="p-5">${converttime(time.Asr)}</p>
                        </div>
                </div>
                <div class="col-12 col-lg-2  order-2 order-lg-3">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">الظهر</h2>
                            <p class="p-5">${converttime(time.Dhuhr)}</p>
                        </div>
                </div>
                <div class="col-12 col-lg-2 order-1 order-lg-4">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">الشروق</h2>
                            <p class="p-5">${converttime(time.Sunrise)}</p>
                        </div>
                </div>
                <div class="col-12 col-lg-2 order-0 order-lg-5">
                        <div class="box rounded-2 overflow-hidden">
                            <h2 class="p-2">الفجر</h2>
                            <p class="p-5">${converttime(time.Fajr)}</p>
                        </div>
                </div>
        `
        document.getElementById('row').innerHTML=cartona;
    };
    function cleardata(){
        countries.value='';
        cities.value='';
    }
    function converttime(time){
        let [hours24,minutes]=time.split(':');
        let hours12=(hours24%12) || 12;
        console.log(hours12);
        console.log(typeof(hours12))
        let period=hours24>=12?'PM':'AM';
        return `${hours12}:${minutes} ${period}`;
        
    }
    getsearch('egypt','cairo');

