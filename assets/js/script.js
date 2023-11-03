$(document).ready(() => {
  //Fungsi yang mengatur burger button drop down menu/list
  const $burger = $(".burger-btn");
  const $navMenu = $(".navbar-menu");

  const hideMenu = () => {
    $navMenu.removeClass("active");
    $(document).off("click", handleOutsideClick);
  };

  const handleOutsideClick = (event) => {
    if (!$navMenu.is(event.target) && $navMenu.has(event.target).length === 0) {
      hideMenu();
    }
  };

  $burger.on("click", (event) => {
    event.stopPropagation();
    $navMenu.toggleClass("active");

    if ($navMenu.hasClass("active")) {
      $(document).on("click", handleOutsideClick);
    }
  });

  /* Fungsi untuk menghitung umur berdasarkan tanggal lahir
  dan menampilkannya pada setiap elemen span dengan id age */
  const $bornDay = $("#bornDay");
  const $ageSpans = $(".age");

  const calculateAge = () => {
    const bornDayText = $bornDay.text();
    const bornDay = new Date(bornDayText);
    const today = new Date();

    const yearGap = today.getFullYear() - bornDay.getFullYear();
    const thisMonth = today.getMonth();
    const bornMonth = bornDay.getMonth();

    const ageText =
      thisMonth < bornMonth ||
        (thisMonth === bornMonth && today.getDate() < bornDay.getDate())
        ? `${yearGap - 1} tahun`
        : `${yearGap} tahun`;

    $ageSpans.text(ageText);
  };

  calculateAge();

  /* Fungsi untuk menyembunyikan header pada saat webpage di scroll kebawah
  dan menampilkannya kembali pada saat webpage di scroll ke atas */
  const HIDE_HEADER_THRESHOLD = -80;
  let prevScrollPosition = window.pageYOffset;

  $(window).on("scroll", () => {
    const currentScrollPosition = window.pageYOffset;
    const $mainHeader = $(".main-header");

    if (prevScrollPosition > currentScrollPosition) {
      $mainHeader.css("top", "0");
    } else {
      $mainHeader.css("top", `${HIDE_HEADER_THRESHOLD}px`);
    }

    prevScrollPosition = currentScrollPosition;
  });

  // Fungsi untuk memanipulasi header pada sidebar/aside
  function moveAboutHeader() {
    const screenWidth = $(window).width();

    if (screenWidth <= 1200) {
      const $aboutHeader = $('article.about header h3');
      const $aboutHeaderContent = $aboutHeader.text();
      $aboutHeader.remove();

      const $aboutHeaderDiv = $('article.about .about-header');
      const newAboutHeader = $('<h3>').text($aboutHeaderContent);

      $aboutHeaderDiv.append(newAboutHeader);
    }
  }

  moveAboutHeader();
  $(window).on('resize', moveAboutHeader);
});
