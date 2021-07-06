from pynicotine.pluginsystem import BasePlugin

class Plugin(BasePlugin):
    __name__ = "Botnored"

    def user_resolve_notification(self, user, ip, port, country):  # noqa
        if ip != '0.0.0.0' and port == 0:
            if not self.frame.np.network_filter.is_user_ignored(user):
                self.frame.np.network_filter.ignore_user(user)
                self.log(user)
