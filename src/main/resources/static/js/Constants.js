const CONFIG = {
    GRID_WIDTH: 16,
    GRID_HEIGHT: 16,

    GRID_CELL_SIZE_PX: 55,
    GRID_CELL_GAP_PX: 1,
    GRID_CELL_GAP_SIZE_PX: 14,

    ROBOT_PIECE_SIZE_PX: 30
}

const SOURCE_CELL = {
    DEFAULT: '/asset/cells/default.png',
    RED_PLANET: '/asset/cells/red_planet.png',
    BLUE_PLANET: '/asset/cells/blue_planet.png',
    GREEN_PLANET: '/asset/cells/green_planet.png',
    YELLOW_PLANET: '/asset/cells/yellow_planet.png',
    RED_STAR: '/asset/cells/red_star.png',
    BLUE_STAR: '/asset/cells/blue_star.png',
    GREEN_STAR: '/asset/cells/green_star.png',
    YELLOW_STAR: '/asset/cells/yellow_star.png',
    RED_TRIANGLE: '/asset/cells/red_triangle.png',
    BLUE_TRIANGLE: '/asset/cells/blue_triangle.png',
    GREEN_TRIANGLE: '/asset/cells/green_triangle.png',
    YELLOW_TRIANGLE: '/asset/cells/yellow_triangle.png',
    RED_MOON: '/asset/cells/red_moon.png',
    BLUE_MOON: '/asset/cells/blue_moon.png',
    GREEN_MOON: '/asset/cells/green_moon.png',
    YELLOW_MOON: '/asset/cells/yellow_moon.png',
    MULTICOLOR: '/asset/cells/multicolor.png'
}

const ROBOTS_COLORS = {
    RED: '/asset/robots/red_robot.png',
    BLUE: '/asset/robots/blue_robot.png',
    GREEN: '/asset/robots/green_robot.png',
    YELLOW: '/asset/robots/yellow_robot.png',
    GRAY: '/asset/robots/gray_robot.png'
}

// const SOURCE_CELL = {
//     DEFAULT: '../static/asset/cells/default.png',
//     RED_PLANET: '../static/asset/cells/red_planet.png',
//     BLUE_PLANET: '../static/asset/cells/blue_planet.png',
//     GREEN_PLANET: '../static/asset/cells/green_planet.png',
//     YELLOW_PLANET: '../static/asset/cells/yellow_planet.png',
//     RED_STAR: '../static/asset/cells/red_star.png',
//     BLUE_STAR: '../static/asset/cells/blue_star.png',
//     GREEN_STAR: '../static/asset/cells/green_star.png',
//     YELLOW_STAR: '../static/asset/cells/yellow_star.png',
//     RED_TRIANGLE: '../static/asset/cells/red_triangle.png',
//     BLUE_TRIANGLE: '../static/asset/cells/blue_triangle.png',
//     GREEN_TRIANGLE: '../static/asset/cells/green_triangle.png',
//     YELLOW_TRIANGLE: '../static/asset/cells/yellow_triangle.png',
//     RED_MOON: '../static/asset/cells/red_moon.png',
//     BLUE_MOON: '../static/asset/cells/blue_moon.png',
//     GREEN_MOON: '../static/asset/cells/green_moon.png',
//     YELLOW_MOON: '../static/asset/cells/yellow_moon.png',
//     MULTICOLOR: '../static/asset/cells/multicolor.png'
// }
//
// const ROBOTS_COLORS = {
//     RED: '../static/asset/robots/red_robot.png',
//     BLUE: '../static/asset/robots/blue_robot.png',
//     GREEN: '../static/asset/robots/green_robot.png',
//     YELLOW: '../static/asset/robots/yellow_robot.png',
//     GRAY: '../static/asset/robots/gray_robot.png'
// }

const WALL_DIRECTION = {
    HORIZONTAL: 0,
    VERTICAL: 1
}

const WALL_STATE = {
    EMPTY: 0,
    SOLID: 1
}

const MODE = {
    PLAY: 0,
    EDIT: 1
}

export {CONFIG, SOURCE_CELL, ROBOTS_COLORS, WALL_DIRECTION, WALL_STATE, MODE};