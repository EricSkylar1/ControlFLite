export default function SearchText({ items }) {

	if(!items) return null;

	return (
		<div>
			{items.map((item, index) => (
				<div>
					{item}
				</div>
			))}
		</div>
	)
}