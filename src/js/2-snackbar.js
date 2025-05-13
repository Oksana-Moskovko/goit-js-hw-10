import iziToast from "izitoast";
import "izitoast/dist/css/iziToast.min.css";

const form = document.querySelector('.form');

form.addEventListener('submit', function (even) {
    even.preventDefault();
    const formData = new FormData(this);
    const delay = Number(formData.get('delay'));
    const state = formData.get('state');
    
    makePromise({ state, delay, shouldResolve: state === "fulfilled" })
    .then(res => {
        iziToast.info({
            message: `✅ Fulfilled promise in ${delay}ms`,
            position: 'topRight',
            icon: '',
            backgroundColor: 'green',
            messageColor: 'white',
            timeout: 5000,
        })
    })
    .catch(err => {
        iziToast.info({
            message: `❌ Rejected promise in ${delay}ms`,
            position: 'topRight',
            icon: '',
            backgroundColor: 'red', 
            timeout: 5000,
            messageColor: 'white',
        })
    });

    this.reset();
})

const makePromise = ({ state, delay, shouldResolve = true }) => {
  return new Promise((resolve, reject) => {
	   setTimeout(() => {
				if(shouldResolve) {
                    resolve(state);
				} else {
                    reject(state);
				}
			}, delay);
  });
};

