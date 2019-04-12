function getColorId (color) {
    if(color.toLowerCase()==='primary')
        return 0;
    if(color.toLowerCase()==='red')
        return 1;
    if(color.toLowerCase()==='green')
        return 2;
    if(color.toLowerCase()==='yellow')
        return 3;
}

function getCircleClasses (color) {
    if(color.toLowerCase()==='primary')
        return 'btn btn-circle btn-primary';
    if(color.toLowerCase()==='red')
        return 'btn btn-circle btn-danger';
    if(color.toLowerCase()==='green')
        return 'btn btn-circle btn-success';
    if(color.toLowerCase()==='yellow')
        return 'btn btn-circle btn-warning';
}

module.exports = {
    getColorId: getColorId,
    getCircleClasses: getCircleClasses
}