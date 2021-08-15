export {
    beautiful_date,
    startsWithOneOf
}

function startsWithOneOf(start: string, arr: string[]) : boolean {
    for (let i = 0; i < arr.length; i++)
        if (start.startsWith(arr[i])) return true;
    return false;
}

function beautiful_date(d: Date) : string {
    var date = [ d.getMonth() + 1, d.getDate(), d.getFullYear() ];
    var time = [ d.getHours(), d.getMinutes(), d.getSeconds() ];
    var suffix = ( time[0] < 12 ) ? "AM" : "PM";
    time[0] = ( time[0] < 12 ) ? time[0] : time[0] - 12;
    time[0] = time[0] || 12;
    for ( var i: number = 1; i < 3; i++ )
        if ( time[i] < 10 )
            (time as any)[i] = "0" + time[i];
    return date.join("/") + " " + time.join(":") + " " + suffix;  
}