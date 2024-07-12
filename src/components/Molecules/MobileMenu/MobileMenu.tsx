import { Badge, Box, IconButton, Menu, MenuItem } from "@mui/material";
import { notifyError } from "@src/lib/toastsNotifier";
import { getRefreshToken } from "@src/lib/tokenService";
import eventInvitationRepository from "@src/repositories/eventInvitationRepository";
import { axiosErrorHandler } from "@src/utils/axiosErrorHandler";
import { useEffect, useState } from "react";
import { IoNotificationsOutline } from "react-icons/io5";
import { Link } from "react-router-dom";

export default function MobileMenu() {
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState<null | HTMLElement>(null);
  const [, setSocket] = useState<WebSocket | null>(null);
  const [notifications, setNotifications] = useState<number>(0)


  useEffect(() => {
    const refreshToken = getRefreshToken()
    const userId = refreshToken?.userId
    if (!userId) {
      return
    }
    const ws = new WebSocket('ws://localhost:3000/ws/users');
    ws.onopen = () => {
      ws.send(JSON.stringify({ type: 'refreshUserNotifications', userId }));
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      if (data.type === 'refreshNotification' && data.userId === userId) {
        const refresh_token = getRefreshToken()
        if (refresh_token) {
          const { userId } = refresh_token
          getNotifications(userId);
        }
      }
    };

    setSocket(ws);
  }, []);

  useEffect(() => {
    const refresh_token = getRefreshToken()
    if (refresh_token) {
      const { userId } = refresh_token
      getNotifications(userId)
    }
  }, []);

  async function getNotifications(userId: string) {
    try {
      const result = await eventInvitationRepository.getNotifications(userId)
      setNotifications(result.data)
    } catch (error) {
      const errorMessage = axiosErrorHandler(error)
      notifyError(errorMessage, 2500)
    }
  }

  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      sx={{ mt: '45px' }}
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem>
        <Link to="notifications" onClick={handleMobileMenuClose} className="flex gap-4 text-2xl text-stone-900 top-40 left-40">
          <Badge badgeContent={notifications} color="error">
            <IoNotificationsOutline />
          </Badge>
          <span className="text-base">Solicitações de Entrada</span>
        </Link>
      </MenuItem>
    </Menu>
  );

  return (
    <Box title="Notificações">
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <Badge badgeContent={notifications} color="error">
          <IoNotificationsOutline />
        </Badge>
      </IconButton>
      {renderMobileMenu}
    </Box>
  )
}