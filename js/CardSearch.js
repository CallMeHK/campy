import {
	html,
	render,
	Component,
} from "https://unpkg.com/htm/preact/index.mjs?module";

export class CardSearch extends Component {
	constructor() {
		super();
		this.state = {
			search: "",
		};
	}

	onInput(e) {
		this.setState({ search: e.target.value });
	}

	render(props, state) {
		const filteredList = props.list.filter(([title, _]) =>
			title.toLowerCase().includes(state.search.toLowerCase())
		);

		return html`<div>
			<div>
				<input onInput=${(e) => this.onInput(e)} value=${state.search} />
			</div>
			<div>
				${filteredList.map(
					([title, description, url]) => html`
						<div
							class="card fp-card"
							onclick=${() => {
								window.location = url;
							}}
						>
							<div class="card-container">
								<h4><b>${title}</b></h4>
								<p>${description}</p>
							</div>
						</div>
					`
				)}
			</div>
		</div>`;
	}
}

export const renderCardList = (list, root) => render(html`<${CardSearch} list=${list} />`, document.querySelector(root));
