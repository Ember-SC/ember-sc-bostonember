export default function testOnSameRow(detail, parent) {
    var err_msg = 'Fail: ';
    var contains = false;
    var matching_row = $('tr:contains(' + detail + ')').html();
    if (matching_row) {
        contains = matching_row.indexOf('>' + parent + '<') >= 0;
        if (!contains) {
            err_msg = "Fail: row containing '" + detail + "' does not also have '" + parent + "'.";
        }
    }
    else {
        err_msg = "Fail: no row cell exactly matches '" + detail + "'";
    }
    ok(contains, err_msg);
}
