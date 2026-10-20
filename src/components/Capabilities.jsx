import SectionHead from "./SectionHead";
import { projects, toolGroups } from "../data/projects";
import { alsoUsing, learning } from "../data/profile";

const Capabilities = () => (
  <section className="section" aria-labelledby="caps-title">
    <div className="wrap" id="capabilities">
      <SectionHead
        id="caps-title"
        title="What I"
        serif="work with"
        note="No skill bars. Each dot is one of the six projects above, in order — filled if it was built with that tool."
      />

      <div className="caps">
        {toolGroups.map((group, gi) => (
          <div key={group.label} className="cap" data-reveal style={{ "--delay": `${gi * 120}ms` }}>
            <div className="cap__head">
              <h3 className="cap__title">{group.label}</h3>
              <span className="mono">0{gi + 1}</span>
            </div>
            <ul className="cap__list" role="list">
              {group.tools.map((tool) => {
                const used = projects.map((p) => p.stack.includes(tool));
                const count = used.filter(Boolean).length;
                return (
                  <li key={tool}>
                    <span className="cap__tool">{tool}</span>
                    <span className="dots" role="img" aria-label={`Used in ${count} of ${projects.length} projects`}>
                      {used.map((on, i) => (
                        <i key={projects[i].id} className={on ? "on" : undefined} />
                      ))}
                    </span>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </div>

      <div className="caps__meta">
        <div data-reveal>
          <p className="eyebrow">Also in the kit</p>
          <p>{alsoUsing.join(", ")}</p>
        </div>
        <div data-reveal style={{ "--delay": "120ms" }}>
          <p className="eyebrow">Learning now</p>
          <p>{learning.join(", ")}</p>
        </div>
      </div>
    </div>
  </section>
);

export default Capabilities;
