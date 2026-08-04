import Link from "next/link";

import { Section } from "@/components/Section";
import { ArrowUpRight, SocialGlyph } from "@/components/SocialIcons";
import { Tag } from "@/components/Tag";
import { WorkCard } from "@/components/WorkCard";
import { careerSorted } from "@/content/career";
import { contactNote, socialLinks } from "@/content/links";
import { profile } from "@/content/profile";
import { certifications, skillGroups } from "@/content/skills";
import { worksSorted } from "@/content/works";
import { writingsSorted } from "@/content/writings";
import { getAllPosts } from "@/lib/blog";
import { formatDate, formatDateJa, hostOf } from "@/lib/format";

export default function Home() {
  const latestPosts = getAllPosts().slice(0, 3);

  return (
    <>
      <Hero />

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <Section id="about" index="01" title="About" subtitle="自己紹介">
          <div className="grid gap-10 md:grid-cols-[1.4fr_1fr]">
            <div className="space-y-5">
              {profile.lead.map((paragraph) => (
                <p key={paragraph} className="text-muted">
                  {paragraph}
                </p>
              ))}

              <div className="flex flex-wrap gap-3 pt-2">
                {profile.circles.map((circle) => (
                  <div
                    key={circle.name}
                    className="flex-1 basis-56 rounded-xl border border-line bg-surface p-4"
                  >
                    <p className="font-display text-base font-bold">
                      {circle.url ? (
                        <a
                          href={circle.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 hover:text-accent"
                        >
                          {circle.name}
                          <ArrowUpRight className="h-3.5 w-3.5" />
                        </a>
                      ) : (
                        circle.name
                      )}
                    </p>
                    <p className="mt-1 text-sm text-muted">
                      {circle.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

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
              <ProfileRow label="出身">{profile.from}</ProfileRow>
              <ProfileRow label="所属">{profile.affiliation}</ProfileRow>
            </dl>
          </div>
        </Section>

        <Section id="works" index="02" title="Works" subtitle="制作物">
          <div className="grid gap-6 sm:grid-cols-2">
            {worksSorted.map((work) => (
              <WorkCard key={work.slug} work={work} />
            ))}
          </div>
        </Section>

        <Section
          id="writing"
          index="03"
          title="Writing & Talks"
          subtitle="執筆・スライド発表"
        >
          <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
            {writingsSorted.map((item) => {
              const inner = (
                <>
                  <div className="flex-1">
                    <p className="leading-snug font-medium transition-colors group-hover:text-accent">
                      {item.title}
                    </p>
                    <div className="mt-2 flex flex-wrap items-center gap-2">
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
                    <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
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
                      className="group flex gap-4 p-5 transition-colors hover:bg-surface-2"
                    >
                      {inner}
                    </a>
                  ) : (
                    <div className="group flex gap-4 p-5">{inner}</div>
                  )}
                </li>
              );
            })}
          </ul>
        </Section>

        <Section id="career" index="04" title="Career" subtitle="経歴">
          <ol className="relative border-l border-line pl-6 sm:pl-8">
            {careerSorted.map((entry) => (
              <li
                key={entry.sortDate + entry.title}
                className="relative pb-8 last:pb-0"
              >
                <span
                  aria-hidden
                  className={`absolute top-2.5 -left-[calc(1.5rem+4.5px)] h-2 w-2 rounded-full sm:-left-[calc(2rem+4.5px)] ${
                    entry.highlight
                      ? "bg-accent ring-4 ring-accent/15"
                      : "bg-line-strong"
                  }`}
                />
                <p className="font-mono text-xs text-faint">{entry.date}</p>
                <p className="mt-1 leading-snug font-medium">{entry.title}</p>
                {entry.detail && (
                  <p className="mt-1 text-sm text-muted">{entry.detail}</p>
                )}
                {entry.link && (
                  <a
                    href={entry.link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-1.5 inline-flex items-center gap-1 text-sm text-accent hover:underline"
                  >
                    {entry.link.label}
                    <ArrowUpRight className="h-3.5 w-3.5" />
                  </a>
                )}
              </li>
            ))}
          </ol>
        </Section>

        <Section
          id="skills"
          index="05"
          title="Skills"
          subtitle="スキル・技術スタック"
        >
          <div className="space-y-4">
            {skillGroups.map((group) => (
              <div
                key={group.level}
                className="rounded-xl border border-line bg-surface p-5 sm:flex sm:gap-6"
              >
                <div className="sm:w-56 sm:shrink-0">
                  <p className="text-lg tracking-[0.2em] text-accent">
                    {"★".repeat(group.level)}
                    <span className="text-line-strong">
                      {"☆".repeat(3 - group.level)}
                    </span>
                  </p>
                  <p className="mt-1 text-xs text-faint">{group.description}</p>
                </div>
                <ul className="mt-4 flex flex-wrap gap-2 sm:mt-0">
                  {group.items.map((item) => (
                    <li
                      key={item}
                      className="rounded-lg border border-line bg-surface-2 px-3 py-1.5 text-sm"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <h3 className="mt-12 mb-4 font-display text-xl font-bold">
            資格
            <span className="ml-2 text-sm font-normal text-faint">
              Certifications
            </span>
          </h3>
          <ul className="grid gap-2 sm:grid-cols-2">
            {certifications.map((cert) => (
              <li
                key={cert.name}
                className="flex items-baseline justify-between gap-4 rounded-lg border border-line bg-surface px-4 py-3 text-sm"
              >
                <span>{cert.name}</span>
                <span className="shrink-0 font-mono text-xs text-faint">
                  {cert.date}
                </span>
              </li>
            ))}
          </ul>
        </Section>

        <Section id="blog" index="06" title="Blog" subtitle="ブログ">
          {latestPosts.length === 0 ? (
            <p className="rounded-xl border border-dashed border-line bg-surface p-8 text-center text-sm text-muted">
              まだ記事がありません。
              <code className="mx-1 rounded bg-surface-2 px-1.5 py-0.5 font-mono text-xs">
                content/blog/
              </code>
              に Markdown を置くとここに並びます。
            </p>
          ) : (
            <>
              <ul className="divide-y divide-line rounded-xl border border-line bg-surface">
                {latestPosts.map((post) => (
                  <li key={post.slug}>
                    <Link
                      href={`/blog/${post.slug}/`}
                      className="group flex gap-4 p-5 transition-colors hover:bg-surface-2"
                    >
                      <div className="flex-1">
                        <p className="leading-snug font-medium transition-colors group-hover:text-accent">
                          {post.title}
                        </p>
                        <p className="mt-1 line-clamp-2 text-sm text-muted">
                          {post.description}
                        </p>
                        <div className="mt-2 flex flex-wrap items-center gap-2">
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
                      <ArrowUpRight className="mt-1 h-4 w-4 shrink-0 text-faint transition-colors group-hover:text-accent" />
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                href="/blog/"
                className="mt-5 inline-flex items-center gap-1.5 text-sm text-accent hover:underline"
              >
                記事をすべて見る
                <ArrowUpRight />
              </Link>
            </>
          )}
        </Section>

        <Section
          id="contact"
          index="07"
          title="Contact"
          subtitle="連絡先・リンク"
        >
          <p className="mb-6 text-muted">{contactNote}</p>
          <div className="grid gap-3 sm:grid-cols-2">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.url}
                target="_blank"
                rel="me noopener noreferrer"
                className="group flex items-center gap-4 rounded-xl border border-line bg-surface p-4 transition-all hover:-translate-y-0.5 hover:border-line-strong"
              >
                <span className="grid h-11 w-11 shrink-0 place-items-center rounded-lg border border-line bg-surface-2 text-muted transition-colors group-hover:border-accent/40 group-hover:text-accent">
                  <SocialGlyph icon={link.icon} />
                </span>
                <span className="min-w-0 flex-1">
                  <span className="block font-display font-bold">
                    {link.label}
                  </span>
                  <span className="block truncate text-xs text-faint">
                    {link.note}
                  </span>
                </span>
                <ArrowUpRight className="shrink-0 text-faint transition-colors group-hover:text-accent" />
              </a>
            ))}
          </div>
        </Section>
      </div>
    </>
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
    <div className="flex gap-4 px-4 py-3">
      <dt className="w-16 shrink-0 text-xs text-faint">{label}</dt>
      <dd className="flex-1">{children}</dd>
    </div>
  );
}

function Hero() {
  const latestCareer = careerSorted[0];

  return (
    <div className="relative overflow-hidden border-b border-line">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid opacity-35 [mask-image:radial-gradient(ellipse_70%_60%_at_50%_0%,black,transparent)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-96 w-[46rem] -translate-x-1/2 rounded-full bg-accent/12 blur-[120px]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute top-10 -right-24 h-72 w-72 rounded-full bg-accent-2/8 blur-[110px]"
      />

      <div className="relative mx-auto max-w-5xl px-5 pt-20 pb-16 sm:px-8 sm:pt-28 sm:pb-24">
        <p className="mb-5 inline-flex items-center gap-2 rounded-full border border-line bg-surface/70 px-3 py-1 font-mono text-xs text-muted backdrop-blur-sm">
          <span className="h-1.5 w-1.5 rounded-full bg-accent" />
          {profile.role}
        </p>

        <h1 className="font-display text-4xl leading-[1.15] font-bold tracking-tight sm:text-6xl">
          <span className="text-gradient">{profile.tagline}</span>
        </h1>

        <p className="mt-6 max-w-2xl text-lg text-muted">
          <span className="font-medium text-fg">
            {profile.name}
            <span className="mx-2 text-faint">/</span>
            {profile.handle}
          </span>
          <br />
          {profile.affiliation}
        </p>

        <div className="mt-9 flex flex-wrap gap-3">
          <Link
            href="/#works"
            className="rounded-lg bg-accent px-5 py-2.5 text-sm font-bold text-bg transition-opacity hover:opacity-85"
          >
            制作物を見る
          </Link>
          <Link
            href="/blog/"
            className="rounded-lg border border-line-strong px-5 py-2.5 text-sm font-bold transition-colors hover:border-accent/50 hover:text-accent"
          >
            ブログ
          </Link>
          <Link
            href="/#contact"
            className="rounded-lg px-5 py-2.5 text-sm font-bold text-muted transition-colors hover:text-fg"
          >
            連絡先
          </Link>
        </div>

        <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-line bg-line sm:grid-cols-4">
          {profile.highlights.map((item) => (
            <div key={item.label} className="bg-surface px-4 py-4">
              <dt className="text-xs text-faint">{item.label}</dt>
              <dd className="mt-0.5 font-display text-lg font-bold">
                {item.value}
              </dd>
            </div>
          ))}
        </dl>

        {latestCareer && (
          <p className="mt-5 flex flex-wrap items-baseline gap-x-2 text-xs text-faint">
            <span>最新の活動</span>
            <span className="font-mono">{formatDateJa(latestCareer.sortDate)}</span>
            <span className="line-clamp-1 text-muted">{latestCareer.title}</span>
          </p>
        )}
      </div>
    </div>
  );
}
