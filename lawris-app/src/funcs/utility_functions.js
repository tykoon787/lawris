import $ from 'jquery';

export function scrollRight(containerSelector, scrollAmount) {
    const $container = $(containerSelector);

    if ($container.length === 0) {
        return;
    }

    const currentScrollLeft = $container.scrollLeft();
    const newScrollLeft = currentScrollLeft + scrollAmount;

    $container.animate(
        {
            scrollLeft: newScrollLeft,
        },
        300
    );
}

export function scrollLeft(containerSelector, scrollAmount) {
    const $container = $(containerSelector);

    if ($container.length === 0) {
        return;
    }
    $container.animate(
        {
            scrollLeft: '-=' + scrollAmount,
        },
        300
    );
}
