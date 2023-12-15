chrome.commands.onCommand.addListener((command) => {
  const tabActions = {
    '01-pin': 'pin',
    '04-group': 'group',
    '02-next': 1,
    '03-previous': -1,
  }

  const tabActionHandler = (tabs, action) => {
    const currentTab = tabs.find((tab) => tab.active)
    if (currentTab) {
      switch (action) {
        case 'pin':
          chrome.tabs.update(currentTab.id, { pinned: !currentTab.pinned })
          break
        case 'group':
          if (currentTab.groupId !== -1) {
            chrome.tabs.ungroup(currentTab.id)
          } else {
            chrome.tabs.group({ tabIds: [currentTab.id] })
          }
          break
        default:
          const currentIndex = tabs.indexOf(currentTab)
          const newIndex = (currentIndex + action + tabs.length) % tabs.length
          chrome.tabs.update(tabs[newIndex].id, { active: true })
          break
      }
    }
  }

  const tabAction = tabActions[command]
  if (tabAction) {
    chrome.tabs.query({ currentWindow: true }, (tabs) => {
      tabActionHandler(tabs, tabAction)
    })
  }
})
