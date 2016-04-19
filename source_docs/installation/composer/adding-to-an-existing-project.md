Adding to an existing Composer project
======================================

If you already have a Composer project setup then run this command inside the
root directory:

```
composer require bolt/bolt ^3.0 
```

If you use this method you will need to bootstrap Bolt yourself, depending on
when you want to dispatch requests to Bolt. For some ideas of how to set up a
bootstrap file see the [advanced installation](installation-advanced) page.


Next Steps
----------

### Permissions

Generally most server should be fine with the default permissions. However, if
you require guidance on setting up permissions, see our [File System Permissions](permissions)
page.

### Finishing Set-up

After you've done this, skip to the section [Setting up Bolt](../../configuration/introduction).