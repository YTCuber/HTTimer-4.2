import tmt
import subprocess
from os.path import join, exists
import shutil

class Project(tmt.EclipseProject):
    def configure(self):
        tmt.EclipseProject.configure(self)
        tmt.WinstoneServer.addPlugin(self)

Project(tmt.projectName(), description="mootools js library")
