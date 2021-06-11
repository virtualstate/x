# Contributing

## Active Contributors

Individuals making significant and valuable contributions are given commit-access to the project to contribute as they see fit. 

### Needing Contributor Access?

If you think you meet the above criteria and we have not invited you yet, we are sorry!
Feel free reach out to a [Lead Maintainer](https://github.com/orgs/virtualstate/teams/leads) privately with
a few links to your valuable contributions.
Read the [GOVERNANCE](GOVERNANCE.md) to get more information.

## Code of Conduct

The Virtual State project has a
[Code of Conduct](https://github.com/virtualstate/x/blob/HEAD/CODE-OF-CONDUCT.md)
to which all contributors must adhere.

## Getting started

When contributing to this repository, please first discuss the change you wish to make by way of an issue,
email, or any other method with the owners of this repository before making a change. 

We are open to all ideas big or small, and are greatly appreciative of any and all contributions.

# Rules

There are a few basic ground-rules for contributors:

- No --force pushes on main or modifying the Git history in any way after a PR has been merged.
- Non-main branches ought to be used for ongoing work.
- External API changes and significant modifications ought to be subject to an internal pull-request to solicit feedback from other contributors.
- Internal pull-requests to solicit feedback are encouraged for any other non-trivial contribution but left to the discretion of the contributor.
- Contributors should attempt to adhere to the prevailing code-style.
- At least two contributors, or one core member, must approve pull-requests prior to merging.
- All integrated CI services must be green before a pull-request can be merged.
- A lead maintainer must merge SemVer-major changes in this repository.
- In case it is not possible to reach consensus in a pull-request, the decision is left to the lead maintainer's team.

# Virtual State Organization Structure

The Virtual State structure is detailed in the [GOVERNANCE](GOVERNANCE.md) document.

### Onboarding Collaborators

Welcome to the team! We are happy to have you. Before you start, please complete the following tasks:

1. Set up 2 factor authentication for GitHub and NPM
  - [GitHub 2FA](https://help.github.com/en/articles/securing-your-account-with-two-factor-authentication-2fa)
  - [NPM 2FA](https://docs.npmjs.com/about-two-factor-authentication)
2. Choose which team to join *(more than one is ok!)* based on how you want to help.
3. Open a pull request to [`virtualstate/x:HEAD`](https://github.com/virtualstate/x/pulls) that adds your name, username, and email to the team you have choosen in the [README.md](./README.md) and [package.json](./package.json) *(if you are part of the core team)* files. The members lists are sorted alphabetically; make sure to add your name in the proper order.
4. The person that does the onboarding must add you to the [npm org](https://www.npmjs.com/org/virtualstate), so that you can help maintaining the official plugins.

### Offboarding Collaborators

We are thankful to you and we are really glad to have worked with you.

We'll be really happy to see you here again if you want to come back, but for now the person that did the onboarding must:

1. Ask the collaborator if they want to stay or not.
1. If the collaborator can't work with us anymore, they should:
  1. Open a pull request to [`virtualstate/x:HEAD`](https://github.com/virtualstate/x/pulls) and move themselves to the *Past Collaborators* section.

The person that did the onboarding must:

1. If the collaborator doesn't reply to the ping in reasonable time, open the pull requests described above.
2. Remove the collaborator from the Virtual State teams on GitHub.
3. Remove the collaborator from the [npm org](https://www.npmjs.com/org/virtualstate).
4. Remove the collaborator from the Digital Ocean team.
5. Remove the collaborator from the Netlify team.

-----------------------------------------

<a id="developers-certificate-of-origin"></a>
## Developer's Certificate of Origin 1.1

By making a contribution to this project, I certify that:

 (a) The contribution was created in whole or in part by me and I
     have the right to submit it under the open source license
     indicated in the file; or

 (b) The contribution is based upon previous work that, to the best
     of my knowledge, is covered under an appropriate open source
     license and I have the right under that license to submit that
     work with modifications, whether created in whole or in part
     by me, under the same open source license (unless I am
     permitted to submit under a different license), as indicated
     in the file; or

 (c) The contribution was provided directly to me by some other
     person who certified (a), (b) or (c) and I have not modified
     it.

 (d) I understand and agree that this project and the contribution
     are public and that a record of the contribution (including all
     personal information I submit with it, including my sign-off) is
     maintained indefinitely and may be redistributed consistent with
     this project or the open source license(s) involved.
