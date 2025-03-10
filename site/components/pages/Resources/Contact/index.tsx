import { NextPage } from "next";
import Link from "next/link";

import { Text, Section } from "@klimadao/lib/components";
import { Trans, t } from "@lingui/macro";

import { urls } from "@klimadao/lib/constants";
import * as styles from "./styles";
import { Container } from "../Container";

export type Props = HTMLHtmlElement;

export const Contact: NextPage<Props> = () => {
  return (
    <Container
      activePage={"contact"}
      title={t({ id: "contact.head.title", message: "Contact KlimaDAO" })}
      headline={t({ id: "contact.head.headline", message: "Contact" })}
      subline={t({
        id: "contact.head.subline",
        message:
          "Questions, concerns, ideas? Here are a few ways you can get in touch. We love meeting institutions and individuals alike.",
      })}
      mediaTitle={t({ id: "contact.head.title" })}
      metaDescription={t({
        id: "shared.head.description",
        message:
          "Drive climate action and earn rewards with a carbon-backed digital currency.",
      })}
      mediaImageSrc="/og-media.png"
    >
      <Section>
        <div className={styles.contactContainer}>
          <div className={styles.contact_textGroup}>
            <Text t="h2" as="h2" align="center">
              <Trans id="contact.quest_and_support">Questions & Support</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.quest_and_support.join_our_community"
                comment="Join our <0>community</0>"
              >
                Join our <Link href={"/community"}>community</Link>
              </Trans>
            </Text>
            <Text t="body3" align="center" color="lighter">
              <Trans
                id="contact.quest_and_support.join_our_discord_server"
                comment="Long sentence"
              >
                Join our Discord server and ask in the #questions channel. We
                have thousands of friendly, knowledgeable community members
                ready and willing to help you out.
              </Trans>
            </Text>
          </div>
        </div>
      </Section>

      <Section variant="gray">
        <div className={styles.contactContainer}>
          <div className={styles.contact_textGroup}>
            <Text t="h2" as="h2" color="lighter">
              <Trans id="concat.careers">Careers</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.careers.we_re_hiring"
                comment="Long We're a fully remote team hiring across all time zones. We regularly post roles and bounties in our <0>Community Discord Server</0>. If you’re a self-starter who's motivated to join a purpose driven DAO, we'd love to hear from you!"
              >
                We're a fully remote team hiring across all time zones. We
                regularly post roles and bounties in our{" "}
                <a href={urls.discordInvite}>Community Discord Server</a>. If
                you’re a self-starter who's motivated to join a purpose driven
                DAO, we'd love to hear from you!
              </Trans>
            </Text>
          </div>
        </div>
      </Section>

      <Section variant="white">
        <div className={styles.contactContainer}>
          <div className={styles.contact_textGroup}>
            <Text t="h2" as="h2">
              <Trans id="contact.partnerships">Partnerships</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.partnerships.until_we_finish_building"
                comment="Until we finish building out our partnerships page, we are directing potential partnership and collaboration inquiries to <0>this contact form</0>."
              >
                Until we finish building out our partnerships page, we are
                directing potential partnership and collaboration inquiries to{" "}
                <a href={urls.partnerShipsContactForm}>this contact form</a>.
              </Trans>
            </Text>
          </div>
        </div>
      </Section>

      <Section variant="gray">
        <div className={styles.contactContainer}>
          <div className={styles.contact_textGroup}>
            <Text t="h2" as="h2" color="lighter">
              <Trans id="contact.media">Media</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.media.if_you_are_a_journalist"
                comment="Long sentence"
              >
                If you are a journalist or content creator, our marketing team
                would love to meet you.
              </Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.media.use_this_media_request_form"
                comment="Use this <0>Media Request Form</0>."
              >
                Use this <a href={urls.mediaRequestForm}>Media Request Form</a>{" "}
                or send an email to{" "}
                <a
                  href={urls.pressEmail}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  press@klimadao.finance
                </a>
              </Trans>
            </Text>
          </div>
        </div>
      </Section>

      <Section>
        <div className={styles.contactContainer}>
          <div className={styles.contact_textGroup}>
            <Text t="h2" as="h2">
              <Trans id="contact.bug_reports">Bug Reports</Trans>
            </Text>
            <Text t="body3" align="center">
              <Trans
                id="contact.bug_reports.to_file_a_bug_report"
                comment="To file a bug report, join our community Discord server and ask your question in the #bug-reports channel. Someone in our <0>community</0> will be happy to investigate and find a solution for you."
              >
                To file a bug report, join our community Discord server and ask
                your question in the #bug-reports channel. Someone in our{" "}
                <Link href={"/community"}>community</Link> will be happy to
                investigate and find a solution for you.
              </Trans>
            </Text>
          </div>
        </div>
      </Section>
    </Container>
  );
};
