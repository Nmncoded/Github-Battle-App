import queryString from 'query-string';
function Winner(props) {
    const params = queryString.parse(props.location.search);
    console.log(params);
    return <h1>winner</h1>
}
export default Winner;