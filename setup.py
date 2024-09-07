from setuptools import setup, find_packages

with open("requirements.txt") as f:
	install_requires = f.read().strip().split("\n")

# get version from __version__ variable in lastmille/__init__.py
from lastmille import __version__ as version

setup(
	name="lastmille",
	version=version,
	description="Last mille program",
	author="larael",
	author_email="overskull@overskull.pe",
	packages=find_packages(),
	zip_safe=False,
	include_package_data=True,
	install_requires=install_requires
)
