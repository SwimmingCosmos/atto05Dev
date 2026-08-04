import Image from "next/image";
import Link from "next/link";

import { Section } from "@/components/Section";
import { ArrowUpRight, SocialGlyph } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { WorkCard } from "@/components/WorkCard";
import { getAllPosts } from "@/lib/blog";
import {
  getCareer,
  getProfile,
  getSkills,
  getWorks,
  getWritings,
} from "@/lib/content";
import { formatDate, hostOf } from "@/lib/format";

export default function Home() {
  const profile = getProfile();
  const works = getWorks();
  const writings = getWritings();
  const career = getCareer();
  const skills = getSkills();
  const posts = getAllPosts().slice(0, 3);

  return (
    <div className="mx-auto max-w-4xl px-5 sm:px-6">
      {/* ---- アイコンと名前 ---- */}
      <header className="py-14 sm:py-20">
        <div className="flex items-center gap-5 sm:gap-7">
          <Image
            src={profile.icon}
            alt={`${profile.handle}のアイコン`}
            width={112}
            height={112}
            priority
            className="h-20 w-20 rounded-full border border-line sm:h-28 sm:w-28"
          />
          <div>
            <h1 className="text-3xl font-bold sm:text-4xl">{profile.handle}</h1>
            <p className="mt-1 text-muted">
              {profile.name}
              <span className="ml-2 font-mono text-xs text-faint">
                {profile.nameEn}
              </span>
            </p>
            {profile.affiliation && (
              <p className="mt-1 text-sm text-muted">{profile.affiliation}</p>
            )}
          </div>
        </div>

        <div className="mt-6 max-w-2xl space-y-3">
          {profile.intro.map((paragraph) => (
            <p key={paragraph} className="text-muted">
              {paragraph}
            </p>
          ))}
        </div>

        <div className="mt-6 flex flex-wrap items-center gap-2">
          {profile.sns.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-lg border border-line bg-surface px-3 py-1.5 text-sm text-muted transition-colors hover:border-line-strong hover:text-fg"
            >
              <SocialGlyph icon={link.icon} className="h-4 w-4" />
              {link.label}
            </a>
          ))}
        </div>
      </header>

      {/* ---- プロフィール ---- */}
      <Section id="about" en="Profile" title="プロフィール">
        <div className="grid gap-6 md:grid-cols-2">
          <dl className="h-fit divide-y divide-line rounded-xl border border-line bg-surface text-sm">
            <ProfileRow label="名前">
              {profile.name}
              <span className="ml-2 font-mono text-xs text-faint">
                {profile.nameEn}
              </span>
            </ProfileRow>
            <ProfileRow label="HN">{profile.handle}</ProfileRow>
            {profile.birthday && (
              <ProfileRow label="誕生日">{profile.birthday}</ProfileRow>
            )}
            {profile.from && <ProfileRow label="出身">{profile.from}</ProfileRow>}
            {profile.affiliation && (
              <ProfileRow label="所属">{profile.affiliation}</ProfileRow>
            )}
          </dl>

          <div className="space-y-3">
            {profile.circles.map((circle) => (
              <div
                key={circle.name}
                className="rounded-xl border border-line bg-surface p-4"
              >
                <p className="font-bold">
                  {circle.url ? (
                    <a
                      href={circle.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 hover:text-accent"
                    >
                      {circle.name}
                      <ArrowUpRight size={13} />
                    </a>
                  ) : (
                    circle.name
                  )}
                </p>
                <p className="mt-0.5 text-sm text-muted">{circle.description}</p>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* ---- 制作物 ---- */}
      <Section id="works" en="Works" title="制作物">
        <div className="grid gap-5 sm:grid-cols-2">
          {works.map((work) => (
            <WorkCard key={work.slug} work={work} />
          ))}
        </div>
      </Section>

      {/* ---- 執筆・スライド発表 ---- */}
      <Section id="writing" en="Writing / Talks" title="執筆・スライド発表">
        <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
          {writings.map((item) => {
            const inner = (
              <>
                <div className="flex-1">
                  <p className="leading-snug font-medium group-hover:text-accent">
                    {item.title}
                  </p>
                  <div className="mt-1.5 flex flex-wrap items-center gap-2">
                    <time
                      dateTime={item.date}
                      className="font-mono text-xs text-faint"
                    >
                      {formatDate(item.date)}
                    </time>
                    {item.kinds.map((kind) => (
                      <Tag key={kind}>{kind}</Tag>
                    ))}
                    {item.url && (
                      <span className="font-mono text-xs text-faint">
                        {hostOf(item.url)}
                      </span>
                    )}
                  </div>
                </div>
                {item.url && (
                  <ArrowUpRight className="mt-1 text-faint group-hover:text-accent" />
                )}
              </>
            );

            return (
              <li key={item.title}>
                {item.url ? (
                  <a
                    href={item.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex gap-4 p-4 transition-colors hover:bg-surface-2"
                  >
                    {inner}
                  </a>
                ) : (
                  <div className="flex gap-4 p-4">{inner}</div>
                )}
              </li>
            );
          })}
        </ul>
      </Section>

      {/* ---- 経歴 ---- */}
      <Section id="career" en="Career" title="経歴">
        <ol className="relative border-l border-line pl-6">
          {career.map((entry) => (
            <li
              key={entry.sort + entry.title}
              className="relative pb-7 last:pb-0"
            >
              <span
                aria-hidden
                className={`absolute top-2 -left-[calc(1.5rem+4px)] h-2 w-2 rounded-full ${
                  entry.highlight ? "bg-accent" : "bg-line-strong"
                }`}
              />
              <p className="font-mono text-xs text-faint">{entry.date}</p>
              <p className="mt-0.5 leading-snug font-medium">{entry.title}</p>
              {entry.detail && (
                <p className="mt-1 text-sm text-muted">{entry.detail}</p>
              )}
              {entry.link && (
                <a
                  href={entry.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-1 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                >
                  {entry.link.label}
                  <ArrowUpRight size={13} />
                </a>
              )}
            </li>
          ))}
        </ol>
      </Section>

      {/* ---- スキル・資格 ---- */}
      <Section id="skills" en="Skills" title="スキル・技術スタック">
        <div className="space-y-3">
          {skills.groups.map((group) => (
            <div
              key={group.stars}
              className="rounded-xl border border-line bg-surface p-4 sm:flex sm:items-start sm:gap-6"
            >
              <div className="sm:w-52 sm:shrink-0">
                <p className="tracking-[0.25em] text-accent">
                  {"★".repeat(group.stars)}
                  <span className="text-line-strong">
                    {"☆".repeat(3 - group.stars)}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-faint">{group.means}</p>
              </div>
              <ul className="mt-3 flex flex-wrap gap-1.5 sm:mt-0">
                {group.items.map((item) => (
                  <li
                    key={item}
                    className="rounded-md border border-line bg-surface-2 px-2.5 py-1 text-sm"
                  >
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <h3 className="mt-10 mb-3 font-bold">
          資格
          <span className="ml-2 font-mono text-xs font-normal text-faint">
            Certifications
          </span>
        </h3>
        <ul className="grid gap-2 sm:grid-cols-2">
          {skills.certifications.map((cert) => (
            <li
              key={cert.name}
              className="flex items-baseline justify-between gap-4 rounded-lg border border-line bg-surface px-3.5 py-2.5 text-sm"
            >
              <span>{cert.name}</span>
              <span className="shrink-0 font-mono text-xs text-faint">
                {cert.date}
              </span>
            </li>
          ))}
        </ul>
      </Section>

      {/* ---- ブログ ---- */}
      <Section id="blog" en="Blog" title="ブログ">
        {posts.length === 0 ? (
          <p className="rounded-xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
            まだ記事がありません。
          </p>
        ) : (
          <>
            <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
              {posts.map((post) => (
                <li key={post.slug}>
                  <Link
                    href={`/blog/${post.slug}/`}
                    className="group flex gap-4 p-4 transition-colors hover:bg-surface-2"
                  >
                    <div className="flex-1">
                      <p className="leading-snug font-medium group-hover:text-accent">
                        {post.title}
                      </p>
                      <div className="mt-1.5 flex flex-wrap items-center gap-2">
                        <time
                          dateTime={post.date}
                          className="font-mono text-xs text-faint"
                        >
                          {formatDate(post.date)}
                        </time>
                        {post.tags.map((tag) => (
                          <Tag key={tag}>{tag}</Tag>
                        ))}
                      </div>
                    </div>
                    <ArrowUpRight className="mt-1 text-faint group-hover:text-accent" />
                  </Link>
                </li>
              ))}
            </ul>
            <Link
              href="/blog/"
              className="mt-4 inline-flex items-center gap-1 text-sm text-accent hover:underline"
            >
              すべての記事
              <ArrowUpRight size={14} />
            </Link>
          </>
        )}
      </Section>

      {/* ---- 連絡先 ---- */}
      <Section id="contact" en="Contact" title="連絡先・リンク">
        <p className="mb-5 text-muted">{profile.contactNote}</p>
        <div className="grid gap-3 sm:grid-cols-2">
          {profile.sns.map((link) => (
            <a
              key={link.label}
              href={link.url}
              target="_blank"
              rel="me noopener noreferrer"
              className="group flex items-center gap-3.5 rounded-xl border border-line bg-surface p-3.5 transition-colors hover:border-line-strong"
            >
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-muted transition-colors group-hover:text-accent">
                <SocialGlyph icon={link.icon} className="h-4.5 w-4.5" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-bold">{link.label}</span>
                {link.note && (
                  <span className="block truncate text-xs text-faint">
                    {link.note}
                  </span>
                )}
              </span>
              <ArrowUpRight className="shrink-0 text-faint transition-colors group-hover:text-accent" />
            </a>
          ))}
        </div>
      </Section>
    </div>
  );
}

function ProfileRow({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex gap-4 px-4 py-2.5">
      <dt className="w-14 shrink-0 text-xs leading-7 text-faint">{label}</dt>
      <dd className="flex-1">{children}</dd>
    </div>
  );
}
