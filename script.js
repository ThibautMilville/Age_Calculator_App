class AgeCalculator {
  constructor() {
    // Initialize the variables
    this.day = document.getElementById('day');
    this.month = document.getElementById('month');
    this.year = document.getElementById('year');
    this.ageDay = document.getElementById('age-day');
    this.ageMonth = document.getElementById('age-month');
    this.ageYear = document.getElementById('age-year');
    this.button = document.getElementById('icon');

    this.button.addEventListener('click', this.calculateAge.bind(this));
  }

  calculateAge() {
    const inputs = document.querySelectorAll('.inputs input');
    const labels = document.querySelectorAll('.inputs label');
    const errorMessages = document.querySelectorAll('.inputs p');

    let hasError = false;

    inputs.forEach((input, index) => {
      const label = labels[index];
      const errorMessage = errorMessages[index];
      if (input.value === '') {
        label.classList.add('invalid');
        input.style.border = '1px solid var(--light-red)';
        errorMessage.classList.add('invalid');
        errorMessage.innerHTML = 'This field is required';
        hasError = true;
      } else {
        label.classList.remove('invalid');
        errorMessage.classList.remove('invalid');
        input.style.border = '1px solid var(--light-grey)';
        errorMessage.innerHTML = '';
      }
    });

    if (!hasError) {
      const inputDay = parseInt(this.day.value, 10);
      const inputMonth = parseInt(this.month.value, 10);
      const inputYear = parseInt(this.year.value, 10);

      const currentDate = new Date();
      const currentDay = currentDate.getDate();
      const currentMonth = currentDate.getMonth() + 1;
      const currentYear = currentDate.getFullYear();

      if (
        inputDay < 1 ||
        inputDay > new Date(inputYear, inputMonth, 0).getDate()
      ) {
        labels[0].classList.add('invalid');
        inputs[0].style.border = '1px solid var(--light-red)';
        errorMessages[0].classList.add('invalid');
        errorMessages[0].innerHTML = 'Must be a valid day';
        hasError = true;
      } else if (inputMonth < 1 || inputMonth > 12) {
        labels[1].classList.add('invalid');
        inputs[1].style.border = '1px solid var(--light-red)';
        errorMessages[1].classList.add('invalid');
        errorMessages[1].innerHTML = 'Must be a valid month';
        hasError = true;
      } else if (
        inputYear > currentYear ||
        inputYear < currentYear - 150 ||
        (inputYear === currentYear && inputMonth > currentMonth) ||
        (inputYear === currentYear && inputMonth === currentMonth && inputDay > currentDay)
      ) {
        labels[2].classList.add('invalid');
        inputs[2].style.border = '1px solid var(--light-red)';
        errorMessages[2].classList.add('invalid');
        errorMessages[2].innerHTML = 'Must be a valid year';
        hasError = true;
      }

      if (!hasError) {
        let ageDays = currentDay - inputDay;
        let ageMonths = currentMonth - inputMonth;
        let ageYears = currentYear - inputYear;

        if (ageDays < 0) {
          ageDays = currentDay;
          ageMonths = ageMonths - 1;
        }

        if (ageMonths < 0) {
          ageMonths = ageMonths + 12;
          ageYears = ageYears - 1;
        }

        // Add the fade-in class to the elements (animation)
        this.ageDay.classList.add('fade-in');
        this.ageMonth.classList.add('fade-in');
        this.ageYear.classList.add('fade-in');

        // Add the active class to the elements after 100ms (animation)
        setTimeout(() => {
          this.ageDay.classList.add('active');
          this.ageMonth.classList.add('active');
          this.ageYear.classList.add('active');
        }, 100);

        // Remove the animation classes after 500ms
        setTimeout(() => {
          this.ageDay.classList.remove('fade-in', 'active');
          this.ageMonth.classList.remove('fade-in', 'active');
          this.ageYear.classList.remove('fade-in', 'active');
        }, 600);

        // Display the age
        this.ageDay.innerHTML = ageDays;
        this.ageMonth.innerHTML = ageMonths;
        this.ageYear.innerHTML = ageYears;
      }
    }
  }
}

// Create an instance of the class
const ageCalculator = new AgeCalculator();