import {
	defineCustomElement as VueDefineCustomElement,
	h,
	createApp,
	getCurrentInstance,
} from 'vue';

const nearestElement = el => {
	while (el?.nodeType !== 1 /* ELEMENT */) el = el.parentElement;
	return el;
};

export const defineCustomElement = component =>
	VueDefineCustomElement({
		setup() {
			const app = createApp();

			app.mixin({
				mounted() {
					const insertStyles = styles => {
						if (styles?.length) {
							this.__style = document.createElement('style');
							this.__style.innerText = styles.join().replace(/\n/g, '');
							nearestElement(this.$el).prepend(this.__style);
						}
					};

					insertStyles(this.$?.type.styles);
					if (this.$options.components) {
						for (const comp of Object.values(this.$options.components)) {
							insertStyles(comp.styles);
						}
					}
				},
				unmounted() {
					this.__style?.remove();
				},
			});

			const inst = getCurrentInstance();
			Object.assign(inst.appContext, app._context);

			return () => h(component);
		},
	});
