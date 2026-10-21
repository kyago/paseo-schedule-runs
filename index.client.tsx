import type { PluginClientContext, PluginSidebarItemProps } from "@getpaseo/plugin/client";
import { SidebarRow } from "@getpaseo/plugin/client/ui";
import { RunsScreen } from "./client/runs-screen";

/**
 * Registers the run feed as a screen with a sidebar header row next to New workspace, History,
 * and Schedules, plus a Command Center entry (the way in on iOS and Android).
 */
const SCREEN_ID = "schedule-runs";

function RunsSidebarItem({ currentScreen, openScreen }: PluginSidebarItemProps) {
  return (
    <SidebarRow
      icon="CalendarClock"
      active={currentScreen?.screenId === SCREEN_ID}
      onPress={() => openScreen({ screenId: SCREEN_ID })}
    />
  );
}

export default function contribute(client: PluginClientContext) {
  const removers = [
    client.addScreen({ id: SCREEN_ID, title: "Schedule runs", Component: RunsScreen }),
    client.addSidebarHeaderItem({ id: "runs", title: "Schedule runs", Component: RunsSidebarItem }),
    client.addCommandCenterItem({
      id: "open-schedule-runs",
      title: "Open schedule runs",
      icon: "CalendarClock",
      keywords: ["schedule", "schedules", "runs", "cron", "heartbeat", "history", "output"],
      context: "global",
      onSelect({ openScreen }) {
        openScreen({ screenId: SCREEN_ID });
      },
    }),
  ];

  return () => {
    for (const remove of removers) void remove();
  };
}
