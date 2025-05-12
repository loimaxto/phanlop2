let container_chitiet = document.getElementById("container_chitiet");
let table_ct = document.querySelectorAll(".bang_gv table tr");

table_ct.forEach((row) => {
    row.addEventListener("click", () =>{
        container_chitiet.style.display = "block";
    })
})

let close_btn = document.querySelector("#form_chitiet button");

close_btn.addEventListener("click",() => {
    container_chitiet.style.display = "none";
})

