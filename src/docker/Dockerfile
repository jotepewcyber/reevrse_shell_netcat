# FROM ubuntu:22.04

# RUN apt-get update && apt-get install -y \
#     netcat-traditional \
#     socat \
#     python3 \
#     python3-pip \
#     curl \
#     wget \
#     vim \
#     sudo \
#     find \
#     gcc \
#     && rm -rf /var/lib/apt/lists/*

# # ── Users ──────────────────────────────────────────────────
# RUN useradd -m -s /bin/bash ctfuser


# # ── FLAG 1: readable by ctfuser  ──
# RUN echo "CTF{y0u_g0t_4_sh3ll_n1c3_w0rk}" > /home/ctfuser/flag1.txt \
#     && chown ctfuser:ctfuser /home/ctfuser/flag1.txt \
#     && chmod 444 /home/ctfuser/flag1.txt

# # ── FLAG 2: only readable by root (requires privesc) ─────────
# RUN echo "CTF{r00t3d_pr1v3sc_m4st3r}" > /root/flag2.txt \
#     && chmod 400 /root/flag2.txt


# # Method 1: SUID on Python3 — classic GTFOBins vector
# RUN chmod u+s /usr/bin/python3

# # Method 2: Misconfigured sudo — ctfuser can run vim as root
# RUN echo "ctfuser ALL=(root) NOPASSWD: /usr/bin/vim" >> /etc/sudoers



# # ── Hint files to guide the player ───────────────────────────
# RUN echo "=== WELCOME TO THE CTF CHALLENGE ===" > /home/ctfuser/README.txt \
#     && echo "" >> /home/ctfuser/README.txt \
#     && echo "Flag 1: Look around your home directory." >> /home/ctfuser/README.txt \
#     && echo "Flag 2: You need ROOT. How do you escalate?" >> /home/ctfuser/README.txt \
#     && echo "" >> /home/ctfuser/README.txt \
#     && echo "Hints:" >> /home/ctfuser/README.txt \
#     && echo "  - Check what commands you can run: sudo -l" >> /home/ctfuser/README.txt \
#     && echo "  - Check SUID binaries: find / -perm -4000 2>/dev/null" >> /home/ctfuser/README.txt \
#     # && echo "  - Check writable files: find / -writable 2>/dev/null" >> /home/ctfuser/README.txt \
#     && chown ctfuser:ctfuser /home/ctfuser/README.txt

# # ── The netcat listener service ───────────────────────────────
# COPY VulnService.sh /home/ctfuser/VulnService.sh
# RUN chown ctfuser:ctfuser /home/ctfuser/VulnService.sh \
#     && chmod +x /home/ctfuser/VulnService.sh

# WORKDIR /home/ctfuser
# USER ctfuser
# EXPOSE 4444

# CMD ["/home/ctfuser/VulnService.sh"]


FROM ubuntu:22.04

RUN apt-get update && apt-get install -y \
    netcat-traditional \
    socat \
    python3 \
    python3-pip \
    curl \
    wget \
    vim \
    sudo \
    gcc \
    bash \
    && rm -rf /var/lib/apt/lists/*

# ── Users ──────────────────────────────────────────────────
RUN useradd -m -s /bin/bash ctfuser

# ── FLAG 1: readable by ctfuser ────────────────────────────
RUN echo "CTF{entered_the_shell}" > /home/ctfuser/flag1.txt \
    && chown ctfuser:ctfuser /home/ctfuser/flag1.txt \
    && chmod 444 /home/ctfuser/flag1.txt

# ── FLAG 2: only readable by root ──────────────────────────
RUN echo "CTF{sudo_su_success}" > /root/flag2.txt \
    && chmod 400 /root/flag2.txt

# ── Privesc methods ────────────────────────────────────────
RUN chmod u+s /usr/bin/python3
RUN echo "ctfuser ALL=(root) NOPASSWD: /usr/bin/vim" >> /etc/sudoers

# ── Hint file ──────────────────────────────────────────────
RUN echo "=== WELCOME TO THE CTF CHALLENGE ===" > /home/ctfuser/README.txt \
    && echo "" >> /home/ctfuser/README.txt \
    && echo "Flag 1: Look around your home directory." >> /home/ctfuser/README.txt \
    && echo "Flag 2: You need ROOT. How do you escalate?" >> /home/ctfuser/README.txt \
    && echo "" >> /home/ctfuser/README.txt \
    && echo "Hints:" >> /home/ctfuser/README.txt \
    && echo "  - Check what commands you can run: sudo -l" >> /home/ctfuser/README.txt \
    && echo "  - Check SUID binaries: find / -perm -4000 2>/dev/null" >> /home/ctfuser/README.txt \
    && chown ctfuser:ctfuser /home/ctfuser/README.txt

WORKDIR /home/ctfuser
USER ctfuser

# ── No port exposed, no CMD service ───────────────────────
# Container just stays alive via `sleep` from the API
# The uploaded script is executed by docker exec from route.ts
CMD ["sleep", "infinity"]