; general config
(setq make-backup-files nil) ; stop creating ~ files

; keymaps
(global-unset-key (kbd "C-z"))

; org-mode
(global-set-key (kbd "C-c l") #'org-store-link)
(global-set-key (kbd "C-c a") #'org-agenda)
(global-set-key (kbd "C-c c") #'org-capture)

(custom-set-variables
 '(org-agenda-files '("~/tech/emacs/emacs.org")))
