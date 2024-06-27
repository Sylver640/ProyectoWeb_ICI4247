-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 27, 2024 at 03:22 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `tunebytes_db`
--

-- --------------------------------------------------------

--
-- Table structure for table `administrador`
--

CREATE TABLE `administrador` (
  `idAdministrador` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Correo` varchar(45) DEFAULT NULL,
  `Contraseña` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `administradorprivilegio`
--

CREATE TABLE `administradorprivilegio` (
  `idAdministradorPrivilegio` int(11) NOT NULL,
  `Administrador_idAdministrador` int(11) NOT NULL,
  `Privilegio_idPrivilegio` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `cancion`
--

CREATE TABLE `cancion` (
  `idCancion` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL,
  `Url` varchar(255) DEFAULT NULL,
  `song_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `cancion`
--

INSERT INTO `cancion` (`idCancion`, `Nombre`, `Url`, `song_id`) VALUES
(6, 'It\'s me, Mario', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663158436d32dcca46ed7fae'),
(7, 'Title Theme', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663159706d32dcca46ed7faf'),
(8, 'Peach\'s Message', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663159d56d32dcca46ed7fb0'),
(9, 'Opening', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315a856d32dcca46ed7fb1'),
(10, 'Super Mario 64 Main Theme', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315ad86d32dcca46ed7fb2'),
(11, 'Slider', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315c786d32dcca46ed7fb3'),
(12, 'Inside the Castle Walls', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315d616d32dcca46ed7fb4'),
(13, 'Looping Steps', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315d896d32dcca46ed7fb5'),
(14, 'Dire, Dire Docks', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315dae6d32dcca46ed7fb6'),
(15, 'Lethal Lava Land', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315dfc6d32dcca46ed7fb7'),
(16, 'Show Mountain', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315e1f6d32dcca46ed7fb8'),
(17, 'Haunted House', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315e636d32dcca46ed7fb9'),
(18, 'Merry-Go-Round', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315e8b6d32dcca46ed7fba'),
(19, 'Cave Dungeon', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315ea96d32dcca46ed7fbb'),
(20, 'Piranha Plant\'s Lullaby', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315ec66d32dcca46ed7fbc'),
(21, 'Powerful Mario', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '66315fec6d32dcca46ed7fbd'),
(22, 'Metallic Mario', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631600b6d32dcca46ed7fbe'),
(23, 'File Select', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663160216d32dcca46ed7fbf'),
(24, 'Toad\'s Message', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663160476d32dcca46ed7fc0'),
(25, 'Power Star', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631605e6d32dcca46ed7fc1'),
(26, 'Race Fanfare', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631607a6d32dcca46ed7fc2'),
(27, 'Correct Solution', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663160eb6d32dcca46ed7fc3'),
(28, 'Star Catch Fanfare', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631611f6d32dcca46ed7fc4'),
(29, 'Game Start', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161456d32dcca46ed7fc5'),
(30, 'Course Clear', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161616d32dcca46ed7fc6'),
(31, 'Game Over', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161816d32dcca46ed7fc7'),
(32, 'Stage Boss', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161a06d32dcca46ed7fc8'),
(33, 'Koopa\'s Message', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161dd6d32dcca46ed7fc9'),
(34, 'Koopa\'s Theme', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663161f46d32dcca46ed7fca'),
(35, 'Koopa Clear', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631620e6d32dcca46ed7fcb'),
(36, 'Ultimate Koopa', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663162236d32dcca46ed7fcc'),
(37, 'Ultimate Koopa Clear', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631624d6d32dcca46ed7fcd'),
(38, 'Ending Demo', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '6631626b6d32dcca46ed7fce'),
(39, 'Staff Roll', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663162866d32dcca46ed7fcf'),
(40, 'Piranha Plant\'s lullaby Piano', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663162b66d32dcca46ed7fd0'),
(41, 'Koopa\'s Road', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '663174f889284748d30745a9'),
(42, 'Shamburger', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '667780bfe513649185b8244a'),
(43, 'I Will Beat On Your Behind', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '66778363e513649185b8244b'),
(44, 'Drizzle', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '667783e6e513649185b8244c'),
(45, 'Machina del diablo', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '66778435e513649185b8244d'),
(46, 'T station', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '66778487e513649185b8244e'),
(47, 'Bass Bag', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '667784bae513649185b8244f'),
(48, 'Ride, Lawrence, Ride!', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '6677854de513649185b82450'),
(49, 'Smells Like Crickets, Tastes Like Chicken', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '667785a7e513649185b82451'),
(50, 'Operation: Monkey', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '667785e3e513649185b82452'),
(51, 'Tazer', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '66778610e513649185b82453'),
(52, 'Main menu', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '6677864ce513649185b82454'),
(53, 'Victory', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '6677867ce513649185b82455'),
(54, 'Wonder Victory', 'https://th.bing.com/th/id/OIP.BvriPJra1wbseYngRo0dpwAAAA?rs=1&pid=ImgDetMain', '667786b9e513649185b82456'),
(55, 'Defeat', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '667786f0e513649185b82457'),
(56, 'Credits', 'https://th.bing.com/th/id/OIP.bE2H2a7sbw82ALzqHD2JrgHaHa?rs=1&pid=ImgDetMain', '6677871ce513649185b82458');

-- --------------------------------------------------------

--
-- Table structure for table `playlist`
--

CREATE TABLE `playlist` (
  `idPlaylist` int(11) NOT NULL,
  `Usuario_idUsuario1` int(11) NOT NULL,
  `Nombre` varchar(45) NOT NULL,
  `Url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `playlist`
--

INSERT INTO `playlist` (`idPlaylist`, `Usuario_idUsuario1`, `Nombre`, `Url`) VALUES
(8, 972086, 'Prueba', 'blob:http://localhost:8100/84d40ad4-1730-4c91-95b2-ce5556c72cff');

-- --------------------------------------------------------

--
-- Table structure for table `playlistcancion`
--

CREATE TABLE `playlistcancion` (
  `idPlaylistCancion` int(11) NOT NULL,
  `Playlist_idPlaylist` int(11) NOT NULL,
  `Cancion_idCancion` int(11) NOT NULL,
  `song_id` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `playlistcancion`
--

INSERT INTO `playlistcancion` (`idPlaylistCancion`, `Playlist_idPlaylist`, `Cancion_idCancion`, `song_id`) VALUES
(4, 8, 9, '66315a856d32dcca46ed7fb1'),
(5, 8, 6, '663158436d32dcca46ed7fae');

-- --------------------------------------------------------

--
-- Table structure for table `privilegio`
--

CREATE TABLE `privilegio` (
  `idPrivilegio` int(11) NOT NULL,
  `Nombre` varchar(45) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `usuario`
--

CREATE TABLE `usuario` (
  `idUsuario` int(11) NOT NULL,
  `Nombre` varchar(80) DEFAULT NULL,
  `Correo` varchar(70) DEFAULT NULL,
  `Contraseña` varchar(255) DEFAULT NULL,
  `RUT` varchar(45) DEFAULT NULL,
  `url` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_general_ci;

--
-- Dumping data for table `usuario`
--

INSERT INTO `usuario` (`idUsuario`, `Nombre`, `Correo`, `Contraseña`, `RUT`, `url`) VALUES
(972081, 'lesitos', 'skibidilocura777@gmail.com', '$2b$12$qiNvDoY3hSziOVJ4TM2URevUbSHlmhKgyI7VhMV/NCw4zDtj5LgDC', '21151511-2', 'https://www.w3schools.com/howto/img_avatar.png'),
(972086, 'vicente', 'vicente@gmail.com', '$2b$12$jeA1oJ47pyJOcYS.xnZsYOueHMrYrQMdS1h5TYCR/1rAuPnzdNkuO', '20.158.396-9', 'https://th.bing.com/th/id/OIP.BawX-wlEDpBxkI7wDv7xNAHaHa?rs=1&pid=ImgDetMain');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `administrador`
--
ALTER TABLE `administrador`
  ADD PRIMARY KEY (`idAdministrador`);

--
-- Indexes for table `administradorprivilegio`
--
ALTER TABLE `administradorprivilegio`
  ADD PRIMARY KEY (`idAdministradorPrivilegio`),
  ADD KEY `fk_AdministradorPrivilegio_Administrador1_idx` (`Administrador_idAdministrador`),
  ADD KEY `fk_AdministradorPrivilegio_Privilegio1_idx` (`Privilegio_idPrivilegio`);

--
-- Indexes for table `cancion`
--
ALTER TABLE `cancion`
  ADD PRIMARY KEY (`idCancion`);

--
-- Indexes for table `playlist`
--
ALTER TABLE `playlist`
  ADD PRIMARY KEY (`idPlaylist`),
  ADD KEY `fk_Playlist_Usuario1_idx` (`Usuario_idUsuario1`);

--
-- Indexes for table `playlistcancion`
--
ALTER TABLE `playlistcancion`
  ADD PRIMARY KEY (`idPlaylistCancion`),
  ADD KEY `fk_PlaylistCanción_Playlist1_idx` (`Playlist_idPlaylist`),
  ADD KEY `fk_PlaylistCanción_Canción1_idx` (`Cancion_idCancion`);

--
-- Indexes for table `privilegio`
--
ALTER TABLE `privilegio`
  ADD PRIMARY KEY (`idPrivilegio`);

--
-- Indexes for table `usuario`
--
ALTER TABLE `usuario`
  ADD PRIMARY KEY (`idUsuario`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `administrador`
--
ALTER TABLE `administrador`
  MODIFY `idAdministrador` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `administradorprivilegio`
--
ALTER TABLE `administradorprivilegio`
  MODIFY `idAdministradorPrivilegio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `cancion`
--
ALTER TABLE `cancion`
  MODIFY `idCancion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=57;

--
-- AUTO_INCREMENT for table `playlist`
--
ALTER TABLE `playlist`
  MODIFY `idPlaylist` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `playlistcancion`
--
ALTER TABLE `playlistcancion`
  MODIFY `idPlaylistCancion` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=6;

--
-- AUTO_INCREMENT for table `privilegio`
--
ALTER TABLE `privilegio`
  MODIFY `idPrivilegio` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `usuario`
--
ALTER TABLE `usuario`
  MODIFY `idUsuario` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=972087;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `administradorprivilegio`
--
ALTER TABLE `administradorprivilegio`
  ADD CONSTRAINT `fk_AdministradorPrivilegio_Administrador1` FOREIGN KEY (`Administrador_idAdministrador`) REFERENCES `administrador` (`idAdministrador`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_AdministradorPrivilegio_Privilegio1` FOREIGN KEY (`Privilegio_idPrivilegio`) REFERENCES `privilegio` (`idPrivilegio`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `playlist`
--
ALTER TABLE `playlist`
  ADD CONSTRAINT `fk_Playlist_Usuario1` FOREIGN KEY (`Usuario_idUsuario1`) REFERENCES `usuario` (`idUsuario`) ON DELETE NO ACTION ON UPDATE NO ACTION;

--
-- Constraints for table `playlistcancion`
--
ALTER TABLE `playlistcancion`
  ADD CONSTRAINT `fk_PlaylistCanción_Canción1` FOREIGN KEY (`Cancion_idCancion`) REFERENCES `cancion` (`idCancion`) ON DELETE NO ACTION ON UPDATE NO ACTION,
  ADD CONSTRAINT `fk_PlaylistCanción_Playlist1` FOREIGN KEY (`Playlist_idPlaylist`) REFERENCES `playlist` (`idPlaylist`) ON DELETE NO ACTION ON UPDATE NO ACTION;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
