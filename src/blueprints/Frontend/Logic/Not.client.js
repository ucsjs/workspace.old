module.exports = ($data, $events, $output) => {
    if($data?.intput && $output?.output)
        $output.output.next(!$data.input);
}