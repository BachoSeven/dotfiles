from pynicotine.pluginsystem import BasePlugin


def enable(plugins):
    global PLUGIN
    PLUGIN = Plugin(plugins)


def disable(plugins):
    global PLUGIN
    PLUGIN = None


class Plugin(BasePlugin):
    __name__ = "Botnored"

    def UserResolveNotification(self, user, ip, port, country):  # noqa
        if ip != '0.0.0.0' and port == 0:
            if not self.frame.np.network_filter.is_user_ignored(user):
                self.frame.np.network_filter.ignore_user(user)
                self.log(user)
