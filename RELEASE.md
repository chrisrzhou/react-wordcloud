# Release Process

This repository is configured with automated releases and NPM publishing through GitHub Actions.

## How it works

### Automated Releases (Recommended)

1. **Update the version** in `package.json` using semantic versioning:
   ```bash
   npm version patch  # for bug fixes (1.3.0 -> 1.3.1)
   npm version minor  # for new features (1.3.0 -> 1.4.0)  
   npm version major  # for breaking changes (1.3.0 -> 2.0.0)
   ```

2. **Push to main branch**:
   ```bash
   git push origin main
   ```

3. **Automatic actions**:
   - CI checks run (install, test, build)
   - If version is new, a GitHub release and tag are created automatically
   - The package is published to NPM registry
   - Release notes are generated from recent commits

### Manual Releases

You can also create releases manually through GitHub's interface:

1. Go to the [Releases page](../../releases)
2. Click "Create a new release"
3. Choose a tag version (e.g., `v1.3.1`)
4. Add release notes
5. Publish the release

This will automatically trigger NPM publishing.

## Workflow Details

- **CI Workflow** (`ci.yml`): Runs on pull requests and feature branches
- **Release Workflow** (`npm-publish.yml`): Runs on main branch pushes and manual releases

## Requirements

- `NPM_TOKEN` secret must be configured in repository settings for NPM publishing
- Version in `package.json` must follow semantic versioning
- Each release requires a unique version number

## Troubleshooting

- If NPM publishing fails, check that `NPM_TOKEN` is valid and has publish permissions
- If releases aren't created, ensure the version in `package.json` is newer than the latest tag
- Check the Actions tab for detailed logs of any failures