import React, { FC, ReactElement, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { selectBalances, selectLocale } from "state/selectors";
import { Trans } from "@lingui/macro";
import { useLocation } from "react-router";
import { Link } from "react-router-dom";
import {
  Anchor as A,
  DiscordIcon,
  GithubIcon,
  LinkedInIcon,
  LogoWithClaim,
  RedditIcon,
  RSSIcon,
  TelegramIcon,
  Text,
  TwitterIcon,
  YoutubeIcon,
} from "@klimadao/lib/components";
import { urls } from "@klimadao/lib/constants";
import { concatAddress } from "@klimadao/lib/utils";
import MenuBookOutlined from "@mui/icons-material/MenuBookOutlined";
import FlipOutlined from "@mui/icons-material/FlipOutlined";
import InfoOutlined from "@mui/icons-material/InfoOutlined";
import LibraryAddOutlined from "@mui/icons-material/LibraryAddOutlined";
import ParkOutlined from "@mui/icons-material/ParkOutlined";
import Payment from "@mui/icons-material/Payment";
import SpaOutlined from "@mui/icons-material/SpaOutlined";

import { createLinkWithLocaleSubPath } from "lib/i18n";

import * as styles from "./styles";

interface MenuButtonProps {
  icon: ReactElement;
  href: string;
  isActive?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}
const MenuButton: FC<MenuButtonProps> = (props) => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // hack for server rendering mismatch. See comment in IsomorphicRoutes.tsx
    setLoading(false);
  }, []);

  if (props.disabled) {
    return (
      <div
        className={styles.sidebarButton}
        data-active={loading ? false : props.isActive}
        data-disabled={true}
      >
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </div>
    );
  }
  // to ensure server render match, return plain anchor until hydration is complete
  if (props.href.startsWith("http") || loading) {
    return (
      <a
        className={styles.sidebarButton}
        data-active={loading ? false : props.isActive}
        href={props.href}
      >
        <div className="iconContainer">{props.icon}</div>
        <span>{props.children}</span>
      </a>
    );
  }
  const handleClick = () => {
    props.onClick?.();
  };
  return (
    <Link
      onClick={handleClick}
      to={props.href}
      data-active={loading ? false : props.isActive}
      className={styles.sidebarButton}
    >
      <div className="iconContainer">{props.icon}</div>
      <span>{props.children}</span>
    </Link>
  );
};

interface Props {
  address?: string;
  onHide?: () => void;
}

export const NavMenu: FC<Props> = (props) => {
  const locale = useSelector(selectLocale);
  const balances = useSelector(selectBalances);
  const { pathname } = useLocation();

  const handleHide = () => {
    props.onHide?.();
  };

  return (
    <nav className={styles.container}>
      <a href={createLinkWithLocaleSubPath(urls.home, locale)}>
        <LogoWithClaim />
      </a>
      <div className="stack-12">
        <div className="hr" />
        <div className="stack-04">
          <Text t="caption">
            <Trans id="menu.wallet_address">Your Wallet Address</Trans>:
          </Text>
          <Text t="caption" color="lightest">
            {props.address ? (
              concatAddress(props.address)
            ) : (
              <Trans id="menu.not_connected">NOT CONNECTED</Trans>
            )}
          </Text>
        </div>
        <div className="hr" />
      </div>
      <MenuButton
        isActive={pathname === "/buy"}
        href={"/buy"}
        icon={<Payment />}
        onClick={handleHide}
      >
        <Trans id="menu.buy_klima">Buy KLIMA</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname === "/stake"}
        href="/stake"
        icon={<LibraryAddOutlined />}
        onClick={handleHide}
      >
        <Trans id="menu.stake_klima">Stake KLIMA</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname.includes("/bond")}
        href="/bonds"
        icon={<SpaOutlined />}
        onClick={handleHide}
      >
        <Trans id="menu.bond_carbon">Bond Carbon</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname === "/wrap"}
        href="/wrap"
        icon={<FlipOutlined />}
        onClick={handleHide}
      >
        <Trans id="menu.wrap_klima">Wrap sKLIMA</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname === "/offset"}
        icon={<ParkOutlined />}
        href="/offset"
        onClick={handleHide}
      >
        <Trans id="menu.offset">Offset</Trans>
      </MenuButton>
      <MenuButton
        isActive={pathname === "/info"}
        href="/info"
        icon={<InfoOutlined />}
        onClick={handleHide}
      >
        <Trans id="menu.info">Info</Trans>
      </MenuButton>
      {!!Number(balances?.pklima) && (
        <div className="labelStack">
          <Text t="badge" color="lightest">
            ⭐ <Trans id="menu.just_for_you">JUST FOR YOU</Trans>
          </Text>
          <MenuButton
            isActive={pathname === "/pklima"}
            icon={<FlipOutlined />}
            href="/pklima"
          >
            <Trans id="token.pKLIMA">pKLIMA</Trans>
          </MenuButton>
        </div>
      )}
      <div className="navFooter">
        <div className="hr" />
        <div className="navFooter_buttons">
          <A className="navFooter_button" href={urls.twitter}>
            <TwitterIcon />
          </A>
          <A className="navFooter_button" href={urls.youtube}>
            <YoutubeIcon />
          </A>
          <A className="navFooter_button" href={urls.discordInvite}>
            <DiscordIcon />
          </A>
          <A className="navFooter_button" href={urls.reddit}>
            <RedditIcon />
          </A>
          <A className="navFooter_button" href={urls.github}>
            <GithubIcon />
          </A>
          <A className="navFooter_button" href={urls.linkedIn}>
            <LinkedInIcon />
          </A>
          <A className="navFooter_button" href={urls.telegram}>
            <TelegramIcon />
          </A>
          <A className="navFooter_button" href={urls.podcast}>
            <RSSIcon />
          </A>
          <A className="navFooter_button" href={urls.officialDocs}>
            <MenuBookOutlined />
          </A>
        </div>
      </div>
    </nav>
  );
};
