($input, $events, $outputs, $trigger) => {
    $trigger.subscribe(() => {
        localStorage.clear();
    });
}