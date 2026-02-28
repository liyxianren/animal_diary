// ==================== 动物日记 - 主要 JavaScript ====================

document.addEventListener('DOMContentLoaded', function() {
    try {
        // 初始化所有功能
        initRandomBackground();
        initFlashMessages();
        initAnimalSelection();
        initDiaryForm();
        initConfirmDialogs();
        initAnimalSwitcher();
        initCalendar();
        initRefreshButton();
        initStatNumbers();
    } catch (error) {
        console.error('初始化出错:', error);
    }
});

// ==================== 随机背景颜色 ====================
function initRandomBackground() {
    // 预定义的渐变色组合
    const gradients = [
        'linear-gradient(135deg, #509b2dff 0%, rgba(233, 218, 218, 1) 100%)', // 绿色
        'linear-gradient(135deg, #667eea 0%, #764ba2 100%)', // 紫色
        'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)', // 粉色
        'linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)', // 蓝色
        'linear-gradient(135deg, #43e97b 0%, #38f9d7 100%)', // 青绿
        'linear-gradient(135deg, #fa709a 0%, #fee140 100%)', // 橙粉
        'linear-gradient(135deg, #a8edea 0%, #fed6e3 100%)', // 淡雅
        'linear-gradient(135deg, #ff9a9e 0%, #fecfef 100%)', // 浅粉
        'linear-gradient(135deg, #ffecd2 0%, #fcb69f 100%)', // 暖橙
        'linear-gradient(135deg, #84fab0 0%, #8fd3f4 100%)', // 蓝绿
        'linear-gradient(135deg, #a1c4fd 0%, #c2e9fb 100%)', // 天蓝
        'linear-gradient(135deg, #fbc2eb 0%, #a6c1ee 100%)'  // 紫粉
    ];
    
    let currentIndex = 0;
    let activeLayer = 1; // 当前显示的背景层 (1 或 2)
    
    const layer1 = document.querySelector('.bg-layer-1');
    const layer2 = document.querySelector('.bg-layer-2');
    
    // 检查必要元素是否存在（只在首页存在背景层）
    if (!layer1 || !layer2) {
        // 背景层元素不存在，跳过背景初始化（非首页正常情况）
        return;
    }
    
    // 设置初始背景
    layer1.style.background = gradients[currentIndex];
    
    // 更新渐变按钮的背景色
    function updateGradientButtons(gradient, activeBtnLayer) {
        const btnLayer1 = document.querySelectorAll('.btn-gradient-bg-1');
        const btnLayer2 = document.querySelectorAll('.btn-gradient-bg-2');

        if (activeBtnLayer === 1) {
            // 更新 layer2 然后淡入
            btnLayer2.forEach(function(bg) {
                bg.style.background = gradient;
                bg.style.opacity = '1';
            });
            btnLayer1.forEach(function(bg) {
                bg.style.opacity = '0';
            });
            return 2;
        } else {
            // 更新 layer1 然后淡入
            btnLayer1.forEach(function(bg) {
                bg.style.background = gradient;
                bg.style.opacity = '1';
            });
            btnLayer2.forEach(function(bg) {
                bg.style.opacity = '0';
            });
            return 1;
        }
    }

    // 初始化按钮背景
    const buttonBgs1 = document.querySelectorAll('.btn-gradient-bg-1');
    buttonBgs1.forEach(function(bg) {
        bg.style.background = gradients[currentIndex];
    });

    let activeBtnLayer = 1;
    
    // 每4秒切换一次背景颜色
    setInterval(function() {
        currentIndex = (currentIndex + 1) % gradients.length;
        const newGradient = gradients[currentIndex];
        
        if (activeLayer === 1) {
            // 在 layer2 上设置新颜色，然后淡入 layer2，淡出 layer1
            if (layer2) {
                layer2.style.background = newGradient;
                layer2.style.opacity = '1';
            }
            if (layer1) {
                layer1.style.opacity = '0';
            }
            activeLayer = 2;
        } else {
            // 在 layer1 上设置新颜色，然后淡入 layer1，淡出 layer2
            if (layer1) {
                layer1.style.background = newGradient;
                layer1.style.opacity = '1';
            }
            if (layer2) {
                layer2.style.opacity = '0';
            }
            activeLayer = 1;
        }
        
        // 更新按钮背景（与当前显示的背景一致）
        activeBtnLayer = updateGradientButtons(newGradient, activeBtnLayer);
    }, 4000);
}

// ==================== Flash 消息自动消失 ====================
function initFlashMessages() {
    const flashMessages = document.querySelectorAll('.flash-message');
    
    flashMessages.forEach(function(message) {
        // 3秒后自动消失
        setTimeout(function() {
            message.style.opacity = '0';
            message.style.transform = 'translateX(-100%)';
            message.style.transition = 'all 0.3s ease';
            
            setTimeout(function() {
                message.remove();
            }, 300);
        }, 3000);
    });
}

// ==================== 刷新按钮 ====================
function initRefreshButton() {
    const refreshBtn = document.getElementById('refreshBtn');
    
    if (!refreshBtn) return;
    
    refreshBtn.addEventListener('click', function() {
        // 添加旋转动画
        this.classList.add('spinning');
        
        // 1秒后刷新页面
        setTimeout(function() {
            window.location.reload();
        }, 1000);
    });
}

// ==================== 动物选择交互 ====================
function initAnimalSelection() {
    const animalCards = document.querySelectorAll('.animal-card');
    
    animalCards.forEach(function(card) {
        card.addEventListener('click', function() {
            // 移除其他卡片的选中状态
            animalCards.forEach(function(c) {
                c.classList.remove('selected');
            });
            
            // 添加当前卡片的选中状态
            card.classList.add('selected');
            
            // 选中 radio 按钮
            const radio = card.querySelector('input[type="radio"]');
            if (radio) {
                radio.checked = true;
            }
        });
    });
}

// ==================== 日记表单 ====================
function initDiaryForm() {
    const diaryForm = document.querySelector('.diary-form');
    const contentTextarea = document.querySelector('#content');
    
    if (contentTextarea) {
        // 自动调整文本框高度
        contentTextarea.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = Math.max(200, this.scrollHeight) + 'px';
        });
        
        // 初始调整
        contentTextarea.style.height = 'auto';
        contentTextarea.style.height = Math.max(200, contentTextarea.scrollHeight) + 'px';
    }
    
    if (diaryForm) {
        // 表单提交前验证
        diaryForm.addEventListener('submit', function(e) {
            const title = document.querySelector('#title');
            const content = document.querySelector('#content');
            
            if (!title.value.trim()) {
                e.preventDefault();
                showNotification('请输入日记标题', 'error');
                title.focus();
                return false;
            }
            
            if (!content.value.trim()) {
                e.preventDefault();
                showNotification('请输入日记内容', 'error');
                content.focus();
                return false;
            }
            
            // 显示保存中提示
            const submitBtn = diaryForm.querySelector('button[type="submit"]');
            if (submitBtn) {
                submitBtn.disabled = true;
                submitBtn.innerHTML = '保存中...';
            }
        });
    }
}

// ==================== 确认对话框 ====================
function initConfirmDialogs() {
    // 删除确认
    const deleteForms = document.querySelectorAll('.delete-form');
    
    deleteForms.forEach(function(form) {
        form.addEventListener('submit', function(e) {
            if (!confirm('确定要删除这篇日记吗？此操作无法撤销。')) {
                e.preventDefault();
            }
        });
    });
}

// ==================== 通知提示 ====================
function showNotification(message, type = 'info') {
    // 创建通知元素
    const notification = document.createElement('div');
    notification.className = `flash-message flash-${type}`;
    notification.textContent = message;
    notification.style.position = 'fixed';
    notification.style.top = '20px';
    notification.style.right = '20px';
    notification.style.zIndex = '1000';
    notification.style.minWidth = '200px';
    
    // 添加到页面
    document.body.appendChild(notification);
    
    // 3秒后消失
    setTimeout(function() {
        notification.style.opacity = '0';
        notification.style.transform = 'translateX(100%)';
        notification.style.transition = 'all 0.3s ease';
        
        setTimeout(function() {
            notification.remove();
        }, 300);
    }, 3000);
}

// ==================== 工具函数 ====================

// 格式化日期
function formatDate(dateString) {
    const date = new Date(dateString);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
}

// 防抖函数
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// 节流函数
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// ==================== 日记搜索功能（可选） ====================
function initDiarySearch() {
    const searchInput = document.querySelector('#diary-search');
    const diaryCards = document.querySelectorAll('.diary-card');
    
    if (searchInput) {
        searchInput.addEventListener('input', debounce(function() {
            const searchTerm = this.value.toLowerCase().trim();
            
            diaryCards.forEach(function(card) {
                const title = card.querySelector('.diary-title').textContent.toLowerCase();
                const preview = card.querySelector('.diary-preview').textContent.toLowerCase();
                
                if (title.includes(searchTerm) || preview.includes(searchTerm)) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        }, 300));
    }
}

// ==================== 日记字数统计 ====================
function initWordCount() {
    const contentTextarea = document.querySelector('#content');
    const wordCountDisplay = document.querySelector('#word-count');
    
    if (contentTextarea && wordCountDisplay) {
        contentTextarea.addEventListener('input', function() {
            const count = this.value.length;
            wordCountDisplay.textContent = `${count} 字`;
        });
    }
}

// ==================== 导出功能（可选） ====================
function exportDiary(diaryId) {
    fetch(`/api/diary/${diaryId}/export`)
        .then(response => response.json())
        .then(data => {
            if (data.success) {
                showNotification('日记导出成功！', 'success');
            } else {
                showNotification('导出失败，请重试', 'error');
            }
        })
        .catch(error => {
            console.error('Export error:', error);
            showNotification('导出失败，请重试', 'error');
        });
}

// ==================== 打印日记 ====================
function printDiary() {
    window.print();
}

// ==================== 键盘快捷键 ====================
document.addEventListener('keydown', function(e) {
    // Ctrl/Cmd + S 保存
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
        e.preventDefault();
        const diaryForm = document.querySelector('.diary-form');
        if (diaryForm) {
            diaryForm.submit();
        }
    }
    
    // Ctrl/Cmd + N 新建日记
    if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
        e.preventDefault();
        window.location.href = '/diary/new';
    }
});

// ==================== 切换动物弹窗 ====================
function initAnimalSwitcher() {
    const trigger = document.getElementById('animalSwitcherTrigger');
    const modal = document.getElementById('animalSwitcherModal');
    const closeBtn = document.getElementById('closeSwitcher');
    const animalOptions = document.querySelectorAll('.switcher-animal-option');
    const selectedAnimalInput = document.getElementById('selectedAnimal');
    
    if (!trigger || !modal) return;
    
    // 打开弹窗
    trigger.addEventListener('click', function() {
        modal.classList.add('active');
    });
    
    // 关闭弹窗
    closeBtn.addEventListener('click', function() {
        modal.classList.remove('active');
    });
    
    // 点击遮罩关闭
    modal.addEventListener('click', function(e) {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // 选择动物
    animalOptions.forEach(function(option) {
        option.addEventListener('click', function() {
            // 移除其他选中状态
            animalOptions.forEach(function(opt) {
                opt.classList.remove('active');
            });
            
            // 添加当前选中状态
            this.classList.add('active');
            
            // 更新隐藏表单值
            const animalValue = this.getAttribute('data-animal');
            selectedAnimalInput.value = animalValue;
        });
    });
}

// ==================== 日记日历 ====================
function initCalendar() {
    const calendarTrigger = document.getElementById('calendarTrigger');
    const calendarModal = document.getElementById('calendarModal');
    const closeCalendar = document.getElementById('closeCalendar');
    const prevBtn = document.getElementById('prevMonth');
    const nextBtn = document.getElementById('nextMonth');
    
    // 打开日历弹窗
    if (calendarTrigger && calendarModal) {
        calendarTrigger.addEventListener('click', function() {
            calendarModal.classList.add('active');
        });
    }
    
    // 关闭日历弹窗
    if (closeCalendar && calendarModal) {
        closeCalendar.addEventListener('click', function() {
            calendarModal.classList.remove('active');
        });
    }
    
    // 点击遮罩关闭
    if (calendarModal) {
        calendarModal.addEventListener('click', function(e) {
            if (e.target === calendarModal) {
                calendarModal.classList.remove('active');
            }
        });
    }
    
    // 月份切换
    if (!prevBtn || !nextBtn) return;
    
    // 从当前URL获取年月
    const urlParams = new URLSearchParams(window.location.search);
    let currentYear = parseInt(urlParams.get('year')) || new Date().getFullYear();
    let currentMonth = parseInt(urlParams.get('month')) || new Date().getMonth() + 1;
    
    // 上一月
    prevBtn.addEventListener('click', function() {
        currentMonth--;
        if (currentMonth < 1) {
            currentMonth = 12;
            currentYear--;
        }
        navigateToMonth(currentYear, currentMonth);
    });
    
    // 下一月
    nextBtn.addEventListener('click', function() {
        currentMonth++;
        if (currentMonth > 12) {
            currentMonth = 1;
            currentYear++;
        }
        navigateToMonth(currentYear, currentMonth);
    });
    
    // 点击日期
    const calendarDays = document.querySelectorAll('.calendar-day');
    calendarDays.forEach(function(day) {
        day.addEventListener('click', function() {
            const dateStr = this.getAttribute('data-date');
            const hasDiary = this.classList.contains('has-diary');
            const isPast = this.getAttribute('data-is-past') === 'true';
            
            // 如果是过去的日期，显示提示
            if (isPast) {
                showNotification('已过时，无法编辑', 'info');
                return;
            }
            
            if (hasDiary) {
                // 如果有日记，可以跳转到该日期的日记详情
                // 这里可以添加跳转到特定日记的逻辑
                console.log('点击了有日记的日期:', dateStr);
            } else {
                // 如果没有日记，可以跳转到写日记页面并预填充日期
                window.location.href = '/diary/new';
            }
        });
    });
}

function navigateToMonth(year, month) {
    const url = new URL(window.location.href);
    url.searchParams.set('year', year);
    url.searchParams.set('month', month);
    window.location.href = url.toString();
}

function initStatNumbers() {
    const statNumbers = document.querySelectorAll('.stat-number[data-stat]');
    
    if (statNumbers.length === 0) return;
    
    fetch('/api/stats')
        .then(function(response) {
            if (!response.ok) {
                throw new Error('API请求失败');
            }
            return response.json();
        })
        .then(function(data) {
            statNumbers.forEach(function(element) {
                const statKey = element.getAttribute('data-stat');
                const target = data[statKey] || 0;
                const duration = 2000;
                const startTime = performance.now();
                const startValue = 0;
                
                function updateNumber(currentTime) {
                    const elapsed = currentTime - startTime;
                    const progress = Math.min(elapsed / duration, 1);
                    
                    const easeOutQuart = 1 - Math.pow(1 - progress, 4);
                    const currentValue = Math.floor(startValue + (target - startValue) * easeOutQuart);
                    
                    element.textContent = currentValue.toLocaleString();
                    
                    if (progress < 1) {
                        requestAnimationFrame(updateNumber);
                    } else {
                        element.textContent = target.toLocaleString();
                    }
                }
                
                requestAnimationFrame(updateNumber);
            });
        })
        .catch(function(error) {
            console.error('获取统计数据失败:', error);
        });
}
