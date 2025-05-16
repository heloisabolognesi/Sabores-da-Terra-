document.addEventListener("DOMContentLoaded", () => {
  // Preloader
  window.addEventListener("load", () => {
    const preloader = document.querySelector(".preloader")
    setTimeout(() => {
      preloader.style.opacity = "0"
      preloader.style.visibility = "hidden"
    }, 1000)
  })

  // Initialize AOS (Animate on Scroll)
  AOS.init({
    duration: 100,
    easing: "ease",
    once: true,
    offset: 100,
  })

  // Hero Slider
  const heroSwiper = new Swiper(".hero-slider", {
    slidesPerView: 1,
    spaceBetween: 0,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    pagination: {
      el: ".swiper-pagination",
      clickable: true,
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
  })

  // Menu mobile toggle
  const menuToggle = document.getElementById("menu-toggle")
  const mainMenu = document.getElementById("main-menu")

  menuToggle.addEventListener("click", () => {
    mainMenu.classList.toggle("active")
    menuToggle.classList.toggle("active")
  })

  // Navegação suave
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault()

      // Fechar menu mobile se estiver aberto
      if (mainMenu.classList.contains("active")) {
        mainMenu.classList.remove("active")
        menuToggle.classList.remove("active")
      }

      const target = document.querySelector(this.getAttribute("href"))
      if (target) {
        window.scrollTo({
          top: target.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  })

  // Menu ativo ao scroll
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  window.addEventListener("scroll", () => {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop
      const sectionHeight = section.clientHeight

      if (pageYOffset >= sectionTop - 200) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === "#" + current) {
        link.classList.add("active")
      }
    })
  })

  // Efeito de scroll para o cabeçalho
  window.addEventListener("scroll", () => {
    const header = document.getElementById("header")
    if (window.scrollY > 50) {
      header.classList.add("scrolled")
    } else {
      header.classList.remove("scrolled")
    }
  })

  // Animação para o indicador de scroll
  setTimeout(() => {
    document.querySelector(".hero-scroll-indicator").classList.add("animate")
  }, 2000)

  // Filtro do Menu
  const filterButtons = document.querySelectorAll(".filter-btn")
  const menuItems = document.querySelectorAll(".menu-item")

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Remover classe ativa de todos os botões
      filterButtons.forEach((btn) => btn.classList.remove("active"))
      // Adicionar classe ativa ao botão clicado
      this.classList.add("active")

      const filter = this.getAttribute("data-filter")

      menuItems.forEach((item) => {
        if (filter === "all" || item.classList.contains(filter)) {
          item.style.display = "flex"
          setTimeout(() => {
            item.style.opacity = "1"
            item.style.transform = "translateY(0)"
          }, 100)
        } else {
          item.style.opacity = "0"
          item.style.transform = "translateY(20px)"
          setTimeout(() => {
            item.style.display = "none"
          }, 300)
        }
      })
    })
  })

  // Galeria Lightbox
  const galleryItems = document.querySelectorAll(".gallery-item")
  const lightbox = document.querySelector(".lightbox")
  const lightboxImage = document.querySelector(".lightbox-image")
  const lightboxCaption = document.querySelector(".lightbox-caption")
  const lightboxClose = document.querySelector(".lightbox-close")
  const lightboxPrev = document.querySelector(".lightbox-prev")
  const lightboxNext = document.querySelector(".lightbox-next")

  let currentImageIndex = 0

  galleryItems.forEach((item, index) => {
    item.addEventListener("click", function () {
      currentImageIndex = index
      const imgSrc = this.querySelector("img").getAttribute("src")
      const imgAlt = this.querySelector("img").getAttribute("alt")

      lightboxImage.setAttribute("src", imgSrc)
      lightboxCaption.textContent = imgAlt
      lightbox.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  lightboxClose.addEventListener("click", () => {
    lightbox.style.display = "none"
    document.body.style.overflow = "auto"
  })

  lightboxPrev.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex - 1 + galleryItems.length) % galleryItems.length
    updateLightboxImage()
  })

  lightboxNext.addEventListener("click", () => {
    currentImageIndex = (currentImageIndex + 1) % galleryItems.length
    updateLightboxImage()
  })

  function updateLightboxImage() {
    const imgSrc = galleryItems[currentImageIndex].querySelector("img").getAttribute("src")
    const imgAlt = galleryItems[currentImageIndex].querySelector("img").getAttribute("alt")

    lightboxImage.setAttribute("src", imgSrc)
    lightboxCaption.textContent = imgAlt
  }

  // Fechar lightbox ao clicar fora da imagem
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Fechar lightbox com tecla ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && lightbox.style.display === "flex") {
      lightbox.style.display = "none"
      document.body.style.overflow = "auto"
    }
  })

  // Definir data mínima como hoje
  const today = new Date().toISOString().split("T")[0]
  document.getElementById("data").min = today

  // Validação e envio do formulário de reserva
  const form = document.getElementById("reservation-form")
  const confirmationDiv = document.getElementById("reservation-confirmation")

  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault()

      if (validateForm()) {
        // Simular envio bem-sucedido
        form.classList.add("hidden")
        confirmationDiv.classList.remove("hidden")

        // Preencher detalhes da confirmação
        document.getElementById("confirmation-email").textContent = document.getElementById("email").value

        const dataInput = document.getElementById("data").value
        if (dataInput) {
          const data = new Date(dataInput)
          const options = { weekday: "long", year: "numeric", month: "long", day: "numeric" }
          document.getElementById("confirmation-date").textContent = data.toLocaleDateString("pt-BR", options)
        }

        document.getElementById("confirmation-time").textContent = document.getElementById("horario").value

        const pessoasValue = document.getElementById("pessoas").value
        document.getElementById("confirmation-people").textContent =
          pessoasValue === "1" ? "1 pessoa" : pessoasValue + " pessoas"

        // Gerar código de reserva aleatório
        const reservationCode =
          "ST" +
          Math.floor(Math.random() * 10000)
            .toString()
            .padStart(4, "0")
        document.getElementById("reservation-code").textContent = reservationCode

        // Animar o ícone de sucesso
        setTimeout(() => {
          document.querySelector(".success-circle").classList.add("animate")
          document.querySelector(".success-check").classList.add("animate")
        }, 200)

        // Rolar para o topo da seção
        const reservasSection = document.getElementById("reservas")
        window.scrollTo({
          top: reservasSection.offsetTop - 80,
          behavior: "smooth",
        })
      }
    })
  }

  function validateForm() {
    const requiredFields = form.querySelectorAll("[required]")
    let isValid = true

    requiredFields.forEach((field) => {
      if (!field.checkValidity()) {
        field.classList.add("invalid")
        isValid = false

        // Mostrar mensagem de erro
        const errorMessage = field.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.style.display = "block"
        }

        // Para checkbox de termos
        if (field.id === "termos") {
          const errorMsg = field.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.style.display = "block"
          }
        }
      } else {
        field.classList.remove("invalid")

        // Ocultar mensagem de erro
        const errorMessage = field.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.style.display = "none"
        }

        // Para checkbox de termos
        if (field.id === "termos") {
          const errorMsg = field.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.style.display = "none"
          }
        }
      }
    })

    return isValid
  }

  // Validação em tempo real
  const inputs = document.querySelectorAll("input, select, textarea")
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.hasAttribute("required") && !this.checkValidity()) {
        this.classList.add("invalid")

        // Mostrar mensagem de erro
        const errorMessage = this.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.style.display = "block"
        }

        // Para checkbox de termos
        if (this.id === "termos") {
          const errorMsg = this.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.style.display = "block"
          }
        }
      } else {
        this.classList.remove("invalid")

        // Ocultar mensagem de erro
        const errorMessage = this.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.style.display = "none"
        }

        // Para checkbox de termos
        if (this.id === "termos") {
          const errorMsg = this.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.style.display = "none"
          }
        }
      }
    })

    input.addEventListener("input", function () {
      if (this.checkValidity()) {
        this.classList.remove("invalid")

        // Ocultar mensagem de erro
        const errorMessage = this.nextElementSibling
        if (errorMessage && errorMessage.classList.contains("error-message")) {
          errorMessage.style.display = "none"
        }

        // Para checkbox de termos
        if (this.id === "termos") {
          const errorMsg = this.parentElement.querySelector(".error-message")
          if (errorMsg) {
            errorMsg.style.display = "none"
          }
        }
      }
    })
  })

  // Nova Reserva
  const newReservationBtn = document.getElementById("new-reservation-btn")
  if (newReservationBtn) {
    newReservationBtn.addEventListener("click", () => {
      confirmationDiv.classList.add("hidden")
      form.classList.remove("hidden")
      form.reset()
    })
  }

  // Termos e Condições Modal
  const termsLinks = document.querySelectorAll(".terms-link")
  const termsModal = document.getElementById("terms-modal")
  const modalClose = document.querySelector(".modal-close")

  termsLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      termsModal.style.display = "flex"
      document.body.style.overflow = "hidden"
    })
  })

  if (modalClose) {
    modalClose.addEventListener("click", () => {
      termsModal.style.display = "none"
      document.body.style.overflow = "auto"
    })
  }

  // Fechar modal ao clicar fora do conteúdo
  if (termsModal) {
    termsModal.addEventListener("click", (e) => {
      if (e.target === termsModal) {
        termsModal.style.display = "none"
        document.body.style.overflow = "auto"
      }
    })
  }

  // Newsletter Form
  const newsletterForm = document.getElementById("newsletter-form")
  const newsletterSuccess = document.getElementById("newsletter-success")

  if (newsletterForm) {
    newsletterForm.addEventListener("submit", (e) => {
      e.preventDefault()
      newsletterForm.style.display = "none"
      newsletterSuccess.classList.remove("hidden")
    })
  }

  // Menu PDF Download
  const menuPdfBtn = document.getElementById("menu-pdf-btn")
  if (menuPdfBtn) {
    menuPdfBtn.addEventListener("click", (e) => {
      e.preventDefault()
      alert("O menu completo seria baixado aqui em um site real.")
    })
  }

  // Back to Top Button
  const backToTopBtn = document.getElementById("back-to-top")

  window.addEventListener("scroll", () => {
    if (window.pageYOffset > 300) {
      backToTopBtn.classList.add("active")
    } else {
      backToTopBtn.classList.remove("active")
    }
  })

  backToTopBtn.addEventListener("click", (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
})





  document.addEventListener('DOMContentLoaded', () => {
    const tables = document.querySelectorAll('#table-map .table');

    tables.forEach(tableEl => {
      const radio = tableEl.querySelector('input[type="radio"]');

      // Quando o usuário clica/seleciona o rádio:
      radio.addEventListener('change', () => {
        // Remove a classe selected de todas as mesas
        tables.forEach(t => t.classList.remove('selected'));

        // Se este rádio estiver agora checked, adiciona selected ao .table pai
        if (radio.checked) {
          tableEl.classList.add('selected');
        }
      });
    });
  });
