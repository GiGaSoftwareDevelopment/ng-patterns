'use strict';

customElements.define('compodoc-menu', class extends HTMLElement {
    constructor() {
        super();
        this.isNormalMode = this.getAttribute('mode') === 'normal';
    }

    connectedCallback() {
        this.render(this.isNormalMode);
    }

    render(isNormalMode) {
        let tp = lithtml.html(`
        <nav>
            <ul class="list">
                <li class="title">
                    <a href="index.html" data-type="index-link">ng-patterns documentation</a>
                </li>

                <li class="divider"></li>
                ${ isNormalMode ? `<div id="book-search-input" role="search"><input type="text" placeholder="Type to search"></div>` : '' }
                <li class="chapter">
                    <a data-type="chapter-link" href="index.html"><span class="icon ion-ios-home"></span>Getting started</a>
                    <ul class="links">
                        <li class="link">
                            <a href="overview.html" data-type="chapter-link">
                                <span class="icon ion-ios-keypad"></span>Overview
                            </a>
                        </li>
                        <li class="link">
                            <a href="index.html" data-type="chapter-link">
                                <span class="icon ion-ios-paper"></span>README
                            </a>
                        </li>
                                <li class="link">
                                    <a href="dependencies.html" data-type="chapter-link">
                                        <span class="icon ion-ios-list"></span>Dependencies
                                    </a>
                                </li>
                                <li class="link">
                                    <a href="properties.html" data-type="chapter-link">
                                        <span class="icon ion-ios-apps"></span>Properties
                                    </a>
                                </li>
                    </ul>
                </li>
                    <li class="chapter modules">
                        <a data-type="chapter-link" href="modules.html">
                            <div class="menu-toggler linked" data-toggle="collapse" ${ isNormalMode ?
                                'data-target="#modules-links"' : 'data-target="#xs-modules-links"' }>
                                <span class="icon ion-ios-archive"></span>
                                <span class="link-name">Modules</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                        </a>
                        <ul class="links collapse " ${ isNormalMode ? 'id="modules-links"' : 'id="xs-modules-links"' }>
                            <li class="link">
                                <a href="modules/PackagesApiModule.html" data-type="entity-link" >PackagesApiModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PackagesMaterialModule.html" data-type="entity-link" >PackagesMaterialModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatternsApiPatternsModule.html" data-type="entity-link" >PatternsApiPatternsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatternsDomainModule.html" data-type="entity-link" >PatternsDomainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatternsUiPatternsModule.html" data-type="entity-link" >PatternsUiPatternsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/PatternsUtilPatternsModule.html" data-type="entity-link" >PatternsUtilPatternsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedDomainModule.html" data-type="entity-link" >SharedDomainModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/SharedSecretsModule.html" data-type="entity-link" >SharedSecretsModule</a>
                            </li>
                            <li class="link">
                                <a href="modules/UiBulletChartModule.html" data-type="entity-link" >UiBulletChartModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' : 'data-target="#xs-components-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' :
                                            'id="xs-components-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' }>
                                            <li class="link">
                                                <a href="components/BulletChartComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulletChartComponent</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/BulletChartTooltipComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulletChartTooltipComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' : 'data-target="#xs-directives-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' :
                                        'id="xs-directives-links-module-UiBulletChartModule-16182d1d8799863458fb2770dd209fba57e019b582f8a4b414d5c92364f774f8c6a662d84e52a627f1b8088f112a9065d65a78fcdefa133d9cf4323b0cb2f9ae"' }>
                                        <li class="link">
                                            <a href="directives/BulletChartDescriptionDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulletChartDescriptionDirective</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/BulletChartTitleDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >BulletChartTitleDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiColorPickerModule.html" data-type="entity-link" >UiColorPickerModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiColorPickerModule-04c115f83b0dbe3b5da77362b2f3ec79912b8f7b796d7334ed4e7eea6f19810a01c996f10069bec125f6e48dd33ecedbc997548bfb5b25d3469391d03b0add2a"' : 'data-target="#xs-components-links-module-UiColorPickerModule-04c115f83b0dbe3b5da77362b2f3ec79912b8f7b796d7334ed4e7eea6f19810a01c996f10069bec125f6e48dd33ecedbc997548bfb5b25d3469391d03b0add2a"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiColorPickerModule-04c115f83b0dbe3b5da77362b2f3ec79912b8f7b796d7334ed4e7eea6f19810a01c996f10069bec125f6e48dd33ecedbc997548bfb5b25d3469391d03b0add2a"' :
                                            'id="xs-components-links-module-UiColorPickerModule-04c115f83b0dbe3b5da77362b2f3ec79912b8f7b796d7334ed4e7eea6f19810a01c996f10069bec125f6e48dd33ecedbc997548bfb5b25d3469391d03b0add2a"' }>
                                            <li class="link">
                                                <a href="components/UiColorPickerComponent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiColorPickerComponent</a>
                                            </li>
                                        </ul>
                                    </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiPopoverModule.html" data-type="entity-link" >UiPopoverModule</a>
                                    <li class="chapter inner">
                                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                            'data-target="#components-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' : 'data-target="#xs-components-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' }>
                                            <span class="icon ion-md-cog"></span>
                                            <span>Components</span>
                                            <span class="icon ion-ios-arrow-down"></span>
                                        </div>
                                        <ul class="links collapse" ${ isNormalMode ? 'id="components-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' :
                                            'id="xs-components-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' }>
                                            <li class="link">
                                                <a href="components/UiPopover.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiPopover</a>
                                            </li>
                                            <li class="link">
                                                <a href="components/UiPopoverItem.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiPopoverItem</a>
                                            </li>
                                        </ul>
                                    </li>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' : 'data-target="#xs-directives-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' :
                                        'id="xs-directives-links-module-UiPopoverModule-02863aef3ed5e8e0527c7f54c47b10b321e2f5851aa67f4bf9f50d1d872616a8822faafaad4eee3a30743016047174b9ef820673dec38736672bd0f4291ba01b"' }>
                                        <li class="link">
                                            <a href="directives/UiPopoverContent.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiPopoverContent</a>
                                        </li>
                                        <li class="link">
                                            <a href="directives/UiPopoverTrigger.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiPopoverTrigger</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                            <li class="link">
                                <a href="modules/UiResizeObserverModule.html" data-type="entity-link" >UiResizeObserverModule</a>
                                <li class="chapter inner">
                                    <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ?
                                        'data-target="#directives-links-module-UiResizeObserverModule-4dd06468ad850aa6d448001c763d90dd96653982b2fb5318f5d952728d808eb00d57e6278375f6ee2c2a0e0b80b2abd3aa12802c2d8b9d6dad4d08377264b4ed"' : 'data-target="#xs-directives-links-module-UiResizeObserverModule-4dd06468ad850aa6d448001c763d90dd96653982b2fb5318f5d952728d808eb00d57e6278375f6ee2c2a0e0b80b2abd3aa12802c2d8b9d6dad4d08377264b4ed"' }>
                                        <span class="icon ion-md-code-working"></span>
                                        <span>Directives</span>
                                        <span class="icon ion-ios-arrow-down"></span>
                                    </div>
                                    <ul class="links collapse" ${ isNormalMode ? 'id="directives-links-module-UiResizeObserverModule-4dd06468ad850aa6d448001c763d90dd96653982b2fb5318f5d952728d808eb00d57e6278375f6ee2c2a0e0b80b2abd3aa12802c2d8b9d6dad4d08377264b4ed"' :
                                        'id="xs-directives-links-module-UiResizeObserverModule-4dd06468ad850aa6d448001c763d90dd96653982b2fb5318f5d952728d808eb00d57e6278375f6ee2c2a0e0b80b2abd3aa12802c2d8b9d6dad4d08377264b4ed"' }>
                                        <li class="link">
                                            <a href="directives/UiResizeObserverDirective.html" data-type="entity-link" data-context="sub-entity" data-context-id="modules" >UiResizeObserverDirective</a>
                                        </li>
                                    </ul>
                                </li>
                            </li>
                </ul>
                </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#components-links"' :
                            'data-target="#xs-components-links"' }>
                            <span class="icon ion-md-cog"></span>
                            <span>Components</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="components-links"' : 'id="xs-components-links"' }>
                            <li class="link">
                                <a href="components/GithubLogoComponent.html" data-type="entity-link" >GithubLogoComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/PackagesNgrxDexieComponent.html" data-type="entity-link" >PackagesNgrxDexieComponent</a>
                            </li>
                            <li class="link">
                                <a href="components/UiuxLogoComponent.html" data-type="entity-link" >UiuxLogoComponent</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#classes-links"' :
                            'data-target="#xs-classes-links"' }>
                            <span class="icon ion-ios-paper"></span>
                            <span>Classes</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="classes-links"' : 'id="xs-classes-links"' }>
                            <li class="link">
                                <a href="classes/AbstractChartComponent.html" data-type="entity-link" >AbstractChartComponent</a>
                            </li>
                            <li class="link">
                                <a href="classes/AbstractChartLayout.html" data-type="entity-link" >AbstractChartLayout</a>
                            </li>
                            <li class="link">
                                <a href="classes/BaseResizeObserver.html" data-type="entity-link" >BaseResizeObserver</a>
                            </li>
                            <li class="link">
                                <a href="classes/BrowserWindowRef.html" data-type="entity-link" >BrowserWindowRef</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartBase.html" data-type="entity-link" >ChartBase</a>
                            </li>
                            <li class="link">
                                <a href="classes/ChartDimensions.html" data-type="entity-link" >ChartDimensions</a>
                            </li>
                            <li class="link">
                                <a href="classes/UiUxProcessQueue.html" data-type="entity-link" >UiUxProcessQueue</a>
                            </li>
                            <li class="link">
                                <a href="classes/WindowRef.html" data-type="entity-link" >WindowRef</a>
                            </li>
                        </ul>
                    </li>
                        <li class="chapter">
                            <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#injectables-links"' :
                                'data-target="#xs-injectables-links"' }>
                                <span class="icon ion-md-arrow-round-down"></span>
                                <span>Injectables</span>
                                <span class="icon ion-ios-arrow-down"></span>
                            </div>
                            <ul class="links collapse " ${ isNormalMode ? 'id="injectables-links"' : 'id="xs-injectables-links"' }>
                                <li class="link">
                                    <a href="injectables/BulletChartService.html" data-type="entity-link" >BulletChartService</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/UiEffects.html" data-type="entity-link" >UiEffects</a>
                                </li>
                                <li class="link">
                                    <a href="injectables/WindowService.html" data-type="entity-link" >WindowService</a>
                                </li>
                            </ul>
                        </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#interfaces-links"' :
                            'data-target="#xs-interfaces-links"' }>
                            <span class="icon ion-md-information-circle-outline"></span>
                            <span>Interfaces</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? ' id="interfaces-links"' : 'id="xs-interfaces-links"' }>
                            <li class="link">
                                <a href="interfaces/BulletChartData.html" data-type="entity-link" >BulletChartData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/BulletChartToolTip.html" data-type="entity-link" >BulletChartToolTip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartConfigBase.html" data-type="entity-link" >ChartConfigBase</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ChartDimensions.html" data-type="entity-link" >ChartDimensions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ColorConfig.html" data-type="entity-link" >ColorConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonChartConfig.html" data-type="entity-link" >CommonChartConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/CommonTooltip.html" data-type="entity-link" >CommonTooltip</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/D3CanvasDimension.html" data-type="entity-link" >D3CanvasDimension</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/D3CanvasMargins.html" data-type="entity-link" >D3CanvasMargins</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/DocumentDimensions.html" data-type="entity-link" >DocumentDimensions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ElSizeConfigDimensions.html" data-type="entity-link" >ElSizeConfigDimensions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ElSizeConfigDimensionsData.html" data-type="entity-link" >ElSizeConfigDimensionsData</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IAllValuesMatchConfig.html" data-type="entity-link" >IAllValuesMatchConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IFindPropsWithValueResult.html" data-type="entity-link" >IFindPropsWithValueResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/IInvokeIfElseIn.html" data-type="entity-link" >IInvokeIfElseIn</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISearchObjectByKeysResult.html" data-type="entity-link" >ISearchObjectByKeysResult</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ISetInSrcConfig.html" data-type="entity-link" >ISetInSrcConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/JSONDOMRect.html" data-type="entity-link" >JSONDOMRect</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/NormalizedSchema.html" data-type="entity-link" >NormalizedSchema</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ObjectMethodAssign.html" data-type="entity-link" >ObjectMethodAssign</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Palette.html" data-type="entity-link" >Palette</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PaletteRef.html" data-type="entity-link" >PaletteRef</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/Palettes.html" data-type="entity-link" >Palettes</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/PatternsUiState.html" data-type="entity-link" >PatternsUiState</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/ResizeObserverEntry.html" data-type="entity-link" >ResizeObserverEntry</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SizeConfig.html" data-type="entity-link" >SizeConfig</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/SizeConfigDimensions.html" data-type="entity-link" >SizeConfigDimensions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiPopoverDefaultOptions.html" data-type="entity-link" >UiPopoverDefaultOptions</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiPopoverPanel.html" data-type="entity-link" >UiPopoverPanel</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/UiUxQueueItem.html" data-type="entity-link" >UiUxQueueItem</a>
                            </li>
                            <li class="link">
                                <a href="interfaces/WindowDimensions.html" data-type="entity-link" >WindowDimensions</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <div class="simple menu-toggler" data-toggle="collapse" ${ isNormalMode ? 'data-target="#miscellaneous-links"'
                            : 'data-target="#xs-miscellaneous-links"' }>
                            <span class="icon ion-ios-cube"></span>
                            <span>Miscellaneous</span>
                            <span class="icon ion-ios-arrow-down"></span>
                        </div>
                        <ul class="links collapse " ${ isNormalMode ? 'id="miscellaneous-links"' : 'id="xs-miscellaneous-links"' }>
                            <li class="link">
                                <a href="miscellaneous/enumerations.html" data-type="entity-link">Enums</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/functions.html" data-type="entity-link">Functions</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/typealiases.html" data-type="entity-link">Type aliases</a>
                            </li>
                            <li class="link">
                                <a href="miscellaneous/variables.html" data-type="entity-link">Variables</a>
                            </li>
                        </ul>
                    </li>
                    <li class="chapter">
                        <a data-type="chapter-link" href="coverage.html"><span class="icon ion-ios-stats"></span>Documentation coverage</a>
                    </li>
                    <li class="divider"></li>
                    <li class="copyright">
                        Documentation generated using <a href="https://compodoc.app/" target="_blank">
                            <img data-src="images/compodoc-vectorise.png" class="img-responsive" data-type="compodoc-logo">
                        </a>
                    </li>
            </ul>
        </nav>
        `);
        this.innerHTML = tp.strings;
    }
});