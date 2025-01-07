export default function sidebarActions () {
    const openSideBar = document.querySelector("#openSideBarBtn");
    const closeSideBar = document.querySelector("#closeSideBarBtn");
    const sidebar = document.querySelector("#sidebar");

    openSideBar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSideBar.classList.toggle("disable-button");
    });

    closeSideBar.addEventListener("click", () => {
        sidebar.classList.toggle("open");
        openSideBar.classList.toggle("disable-button");
    });
}
